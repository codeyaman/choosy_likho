import { NextResponse } from "next/server";
import { db } from "@/db";
import { plans, posts } from "@/db/schema";
import { DURATIONS, INDUSTRIES } from "@/lib/engine";
import { generatePosts } from "@/lib/engine/generate";
import type { DurationKey, IndustryKey } from "@/lib/engine/types";
import { getUserSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const session = await getUserSession();
  let industry: IndustryKey;
  let duration: DurationKey;
  let postCount: number;
  let brandName: string | null = null;
  let reference: string | null = null;
  let files: File[] = [];

  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      const body = await req.json();
      industry = body.industry;
      duration = body.duration;
      postCount = Number(body.postCount);
      brandName = body.brandName?.trim().slice(0, 80) || null;
      reference = body.reference?.trim().slice(0, 8000) || null;
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }
  } else {
    try {
      const formData = await req.formData();
      industry = formData.get("industry") as IndustryKey;
      duration = formData.get("duration") as DurationKey;
      postCount = Number(formData.get("postCount"));
      brandName = (formData.get("brandName") as string | null)?.trim().slice(0, 80) || null;
      reference = (formData.get("reference") as string | null)?.trim().slice(0, 8000) || null;
      files = formData.getAll("files") as File[];
    } catch {
      return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
    }
  }

  if (!industry || !INDUSTRIES[industry]) {
    return NextResponse.json({ error: "Unknown industry." }, { status: 400 });
  }
  if (!duration || !DURATIONS[duration]) {
    return NextResponse.json({ error: "Unknown duration." }, { status: 400 });
  }
  if (![3, 6, 12].includes(postCount)) {
    return NextResponse.json({ error: "Post count must be 3, 6 or 12." }, { status: 400 });
  }

  const seed = Math.abs(
    (Date.now() ^ Math.floor(Math.random() * 0x7fffffff)) % 2147483647,
  );

  const generated = await generatePosts({
    industry,
    duration,
    postCount,
    brandName: brandName ?? undefined,
    reference: reference ?? undefined,
    seed,
    files,
  });

  if (generated.error || !generated.posts) {
    return NextResponse.json({ error: generated.error || "Generation failed" }, { status: 400 });
  }

  const [plan] = await db
    .insert(plans)
    .values({
      industry,
      duration,
      postCount,
      brandName,
      reference,
      seed,
      userId: session?.uid ?? null,
    })
    .returning({ id: plans.id });

  await db.insert(posts).values(
    generated.posts.map((p) => ({
      planId: plan.id,
      position: p.position,
      isoDate: p.isoDate,
      dayLabel: p.dayLabel,
      timeLabel: p.timeLabel,
      pillar: p.pillar,
      category: p.category,
      caption: p.caption,
      visualDirection: p.visualDirection,
      hashtags: p.hashtags,
    })),
  );

  return NextResponse.json({ id: plan.id });
}
