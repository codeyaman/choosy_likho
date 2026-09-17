import { NextResponse } from "next/server";
import { db } from "@/db";
import { plans, posts } from "@/db/schema";
import { eq, and, asc } from "drizzle-orm";
import { getUserSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET full plan data (including posts)
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getUserSession();

  const [plan] = await db.select().from(plans).where(eq(plans.id, id)).limit(1);
  if (!plan) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  // Claim orphaned plan if logged in
  if (session && !plan.userId) {
    await db.update(plans).set({ userId: session.uid }).where(eq(plans.id, id));
    plan.userId = session.uid;
  }

  const postRows = await db
    .select()
    .from(posts)
    .where(eq(posts.planId, plan.id))
    .orderBy(asc(posts.position));

  return NextResponse.json({ plan, posts: postRows });
}

// PATCH: Move to Recycle Bin (trash) or Restore from Recycle Bin
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getUserSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const action = body.action; // "trash" | "restore"

  const [plan] = await db
    .select()
    .from(plans)
    .where(and(eq(plans.id, id), eq(plans.userId, session.uid)))
    .limit(1);

  if (!plan) {
    return NextResponse.json({ error: "Plan not found or unauthorized" }, { status: 404 });
  }

  if (action === "trash") {
    await db.update(plans).set({ deletedAt: new Date() }).where(eq(plans.id, id));
    return NextResponse.json({ success: true, status: "trashed" });
  } else if (action === "restore") {
    await db.update(plans).set({ deletedAt: null }).where(eq(plans.id, id));
    return NextResponse.json({ success: true, status: "restored" });
  }

  return NextResponse.json({ error: "Invalid action. Use 'trash' or 'restore'." }, { status: 400 });
}

// DELETE: Permanently delete brief from database
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getUserSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [plan] = await db
    .select()
    .from(plans)
    .where(and(eq(plans.id, id), eq(plans.userId, session.uid)))
    .limit(1);

  if (!plan) {
    return NextResponse.json({ error: "Plan not found or unauthorized" }, { status: 404 });
  }

  await db.delete(plans).where(eq(plans.id, id));

  return NextResponse.json({ success: true, status: "purged" });
}
