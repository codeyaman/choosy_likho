import { NextResponse } from "next/server";
import { db } from "@/db";
import { plans, posts } from "@/db/schema";
import { DURATIONS, INDUSTRIES } from "@/lib/engine";
import { generatePosts } from "@/lib/engine/generate";
import type { DurationKey, IndustryKey } from "@/lib/engine/types";

export const dynamic = "force-dynamic";

interface Payload {
  industry?: string;
  duration?: string;
  postCount?: number;
  brandName?: string;
  reference?: string;
}

export async function POST(req: Request) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const industry = formData.get("industry") as IndustryKey;
  const duration = formData.get("duration") as DurationKey;
  const postCount = Number(formData.get("postCount"));

  if (!industry || !INDUSTRIES[industry]) {
    return NextResponse.json({ error: "Unknown industry." }, { status: 400 });
  }
  if (!duration || !DURATIONS[duration]) {
    return NextResponse.json({ error: "Unknown duration." }, { status: 400 });
  }
  if (![3, 6, 12].includes(postCount)) {
    return NextResponse.json({ error: "Post count must be 3, 6 or 12." }, { status: 400 });
  }

  const brandName = (formData.get("brandName") as string | null)?.trim().slice(0, 80) || null;
  const reference = (formData.get("reference") as string | null)?.trim().slice(0, 8000) || null;
  const files = formData.getAll("files") as File[];

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
