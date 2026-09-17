import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/auth";
import { db } from "@/db";
import { plans, posts } from "@/db/schema";
import { eq, desc, isNull, isNotNull, and, inArray, asc } from "drizzle-orm";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { Reveal } from "@/components/reveal";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getUserSession();

  if (!session) {
    redirect("/login");
  }

  // Active plans
  const activeRows = await db
    .select()
    .from(plans)
    .where(and(eq(plans.userId, session.uid), isNull(plans.deletedAt)))
    .orderBy(desc(plans.createdAt));

  // Trashed plans in Recycle Bin
  const trashedRows = await db
    .select()
    .from(plans)
    .where(and(eq(plans.userId, session.uid), isNotNull(plans.deletedAt)))
    .orderBy(desc(plans.deletedAt));

  const allPlanIds = [...activeRows.map((p) => p.id), ...trashedRows.map((p) => p.id)];
  let postRows: (typeof posts.$inferSelect)[] = [];
  if (allPlanIds.length > 0) {
    postRows = await db
      .select()
      .from(posts)
      .where(inArray(posts.planId, allPlanIds))
      .orderBy(asc(posts.position));
  }

  const postsByPlan: Record<string, (typeof posts.$inferSelect)[]> = {};
  for (const post of postRows) {
    if (!postsByPlan[post.planId]) {
      postsByPlan[post.planId] = [];
    }
    postsByPlan[post.planId].push(post);
  }

  const serializePlan = (p: typeof plans.$inferSelect) => ({
    id: p.id,
    industry: p.industry,
    duration: p.duration,
    postCount: p.postCount,
    brandName: p.brandName,
    reference: p.reference,
    userId: p.userId,
    createdAt: p.createdAt.toISOString(),
    deletedAt: p.deletedAt ? p.deletedAt.toISOString() : null,
  });

  return (
    <div className="min-h-screen">
      <Reveal />

      <main className="mx-auto max-w-[90rem] px-5 pb-24 pt-20 sm:px-8 lg:pt-20">
        <DashboardClient
          initialActivePlans={activeRows.map(serializePlan)}
          initialTrashedPlans={trashedRows.map(serializePlan)}
          initialPostsByPlan={postsByPlan}
          userEmail={session.email}
        />
      </main>

      <SiteFooter />
    </div>
  );
}
