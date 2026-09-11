import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/auth";
import { db } from "@/db";
import { plans } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { ArrowUpRight, Plus, Quote, LogOut } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { Reveal } from "@/components/reveal";
import { DURATIONS, INDUSTRIES } from "@/lib/engine";

const DATE_FMT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
});

export default async function DashboardPage() {
  const session = await getUserSession();

  if (!session) {
    redirect("/login");
  }

  const userPlans = await db
    .select()
    .from(plans)
    .where(eq(plans.userId, session.uid))
    .orderBy(desc(plans.createdAt));

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Reveal />

      <main className="mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8 lg:pt-40">
        <div data-reveal className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.34em] text-mist">
              <span className="inline-block size-1.5 rounded-full bg-accent" />
              Your Dashboard
            </p>
            <h1 className="mt-6 font-display text-4xl font-medium tracking-tight sm:text-6xl">
              Your <em className="text-accent">content plans</em>
            </h1>
          </div>
          <Link
            href="/#brief"
            className="group flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white/[0.03] px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-cream transition-all hover:border-accent hover:bg-accent hover:text-ink"
          >
            Create a brief
            <Plus className="size-3.5" />
          </Link>
        </div>

        {userPlans.length === 0 ? (
          <div data-reveal className="mt-10 rounded-2xl border border-dashed border-line p-16 text-center">
            <Quote className="mx-auto mb-4 size-8 text-dim" strokeWidth={1} />
            <p className="text-sm text-dim">You haven't generated any plans yet.</p>
            <Link
              href="/#brief"
              className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-accent transition-colors hover:text-cream"
            >
              Start your first brief
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {userPlans.map((p, i) => {
              const ind = INDUSTRIES[p.industry as keyof typeof INDUSTRIES];
              return (
                <Link
                  key={p.id}
                  href={`/plan/${p.id}`}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
                  className={`group scope-${p.industry} relative overflow-hidden rounded-2xl border border-line bg-white/[0.015] p-6 transition-all hover:-translate-y-1 hover:border-[var(--accent)] hover:bg-white/[0.03]`}
                >
                  <div className="accent-glow pointer-events-none absolute -right-12 -top-12 size-44 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-dim">
                      <span className="text-accent">{ind?.label ?? p.industry}</span>
                      <span>{DATE_FMT.format(p.createdAt)}</span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-medium leading-snug">
                      {p.brandName ? p.brandName : "Untitled house"}
                    </h3>
                    <p className="mt-1.5 text-xs text-mist">
                      {p.postCount} posts · {DURATIONS[p.duration as keyof typeof DURATIONS]?.label ?? p.duration}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-dim transition-colors group-hover:text-cream">
                      Open the plan
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
      
      <SiteFooter />
    </div>
  );
}
