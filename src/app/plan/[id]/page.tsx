import { asc, eq } from "drizzle-orm";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CalendarDays,
  Check,
  Clapperboard,
  Feather,
  Hash,
  Hammer,
  MessagesSquare,
  PartyPopper,
  PenLine,
  Sparkles,
  Sunset,
  TrendingUp,
  Type,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { CopyButton } from "@/components/copy-button";
import { PlanActions } from "@/components/plan-actions";
import { Reveal } from "@/components/reveal";
import { db } from "@/db";
import { plans, posts } from "@/db/schema";
import { DURATIONS, INDUSTRIES } from "@/lib/engine";
import { getUserSession } from "@/lib/auth";
import { createGoogleCalendarUrl } from "@/lib/calendar";
import type { LucideIcon } from "lucide-react";

export const dynamic = "force-dynamic";

const CREATED_FMT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function iconFor(category: string): LucideIcon {
  if (category.includes("Craft")) return Hammer;
  if (category.includes("Educational")) return BookOpen;
  if (category.includes("Emotional")) return Sunset;
  if (category.includes("Occasion")) return PartyPopper;
  if (category.includes("Engagement")) return MessagesSquare;
  if (category.includes("Investment") || category.includes("Value")) return TrendingUp;
  if (category.includes("Sensory")) return Feather;
  return Sparkles;
}

export default async function PlanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await getUserSession();

  const [plan] = await db.select().from(plans).where(eq(plans.id, id)).limit(1);
  if (!plan) notFound();

  // Claim orphaned plan
  if (session && !plan.userId) {
    await db.update(plans).set({ userId: session.uid }).where(eq(plans.id, id));
    plan.userId = session.uid;
  }

  const isOwner = session && plan.userId === session.uid;
  const isTeaser = !session;

  const rows = await db
    .select()
    .from(posts)
    .where(eq(posts.planId, plan.id))
    .orderBy(asc(posts.position));

  const industry = INDUSTRIES[plan.industry as keyof typeof INDUSTRIES];
  const duration = DURATIONS[plan.duration as keyof typeof DURATIONS];
  const title = `${plan.brandName ? `${plan.brandName} — ` : ""}${industry?.label ?? "Content"} Content Plan`;
  const createdLabel = CREATED_FMT.format(plan.createdAt);

  const serialized = rows.map((r) => ({
    position: r.position,
    isoDate: r.isoDate,
    dayLabel: r.dayLabel,
    timeLabel: r.timeLabel,
    pillar: r.pillar,
    category: r.category,
    caption: r.caption,
    visualDirection: r.visualDirection,
    hashtags: r.hashtags,
  }));

  return (
    <div className={`scope-${plan.industry} min-h-screen`}>
      <SiteHeader />
      <Reveal />

      <section className="relative px-5 pb-24 pt-28 sm:px-8 lg:pt-36">
        <div className="accent-glow pointer-events-none absolute -top-32 right-0 h-[420px] w-[720px] rounded-full" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[340px_1fr] xl:gap-20">
          {/* -------- left rail -------- */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.24em] text-accent transition-colors hover:text-cream"
              >
                <ArrowLeft className="size-3.5" />
                Dashboard
              </Link>
              <span className="text-dim/50">·</span>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.24em] text-dim transition-colors hover:text-cream"
              >
                The Studio
              </Link>
            </div>

            <div data-reveal className="mt-8">
              <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-mist">
                <span className="inline-block size-1.5 rounded-full bg-accent" />
                The delivery
              </p>
              <h1 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight xl:text-[44px]">
                {plan.brandName ? (
                  <>
                    <em className="text-accent">{plan.brandName}</em>
                    <br />
                  </>
                ) : null}
                {industry?.label} Content Plan
              </h1>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  `${plan.postCount} posts`,
                  duration?.label ?? plan.duration,
                  `Bound ${createdLabel}`,
                ].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-line px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-mist"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              {industry && (
                <p className="mt-6 border-l-2 border-accent pl-4 text-[12px] leading-relaxed text-mist">
                  {industry.description}
                </p>
              )}
            </div>

            <div data-reveal className="mt-8">
              <PlanActions
                meta={{
                  industryLabel: industry?.label ?? plan.industry,
                  durationLabel: duration?.label ?? plan.duration,
                  postCount: plan.postCount,
                  brandName: plan.brandName,
                  createdLabel,
                }}
                posts={serialized}
                regenerate={{
                  industry: plan.industry,
                  duration: plan.duration,
                  postCount: plan.postCount,
                  brandName: plan.brandName,
                  reference: plan.reference,
                }}
              />
            </div>

            {/* index */}
            <nav data-reveal className="mt-10 hidden border-t border-line pt-6 lg:block">
              <p className="text-[10px] uppercase tracking-[0.28em] text-dim">Inside this plan</p>
              <ul className="mt-4 space-y-2">
                {rows.map((r, i) => {
                  if (isTeaser && i > 0) return null;
                  return (
                    <li key={r.id}>
                      <a
                        href={`#post-${r.position}`}
                        className="group flex items-baseline gap-3 text-[12px] text-mist transition-colors hover:text-cream"
                      >
                        <span className="font-display italic text-accent">
                          {String(r.position).padStart(2, "0")}
                        </span>
                        <span className="truncate">{r.pillar}</span>
                        <span className="ml-auto shrink-0 text-[10px] text-dim">{r.dayLabel}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* -------- timeline -------- */}
          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-line to-transparent lg:block" />
            <ol className="space-y-8 lg:pl-12">
              {rows.map((r, i) => {
                if (isTeaser && i > 0) return null;
                const Icon = iconFor(r.category);
                const words = r.caption.split(/\s+/).filter(Boolean).length;
                const fullPost = [
                  `Post ${r.position} — ${r.dayLabel} · ${r.timeLabel}`,
                  `Pillar: ${r.pillar} (${r.category})`,
                  ``,
                  `Caption:`,
                  r.caption,
                  ``,
                  `Visual Direction:`,
                  r.visualDirection,
                  ``,
                  `Hashtags:`,
                  r.hashtags.join(" "),
                ].join("\n");

                return (
                  <li
                    key={r.id}
                    id={`post-${r.position}`}
                    data-reveal
                    style={{ "--reveal-delay": `${Math.min(i, 3) * 70}ms` } as React.CSSProperties}
                    className="group relative scroll-mt-28"
                  >
                    <article className="overflow-hidden rounded-3xl border border-line bg-panel backdrop-blur-sm transition-colors duration-500 hover:border-white/20">
                      {/* head */}
                      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-7 py-6 sm:px-9">
                        <div className="flex items-center gap-5">
                          <span className="numeral-outline font-display text-6xl font-semibold leading-none sm:text-7xl">
                            {String(r.position).padStart(2, "0")}
                          </span>
                          <div>
                            <div className="flex items-center gap-2.5">
                              <span className="flex size-7 items-center justify-center rounded-full border border-accent text-accent">
                                <Icon className="size-3.5" strokeWidth={1.6} />
                              </span>
                              <h2 className="font-display text-xl font-medium">{r.pillar}</h2>
                            </div>
                            <p className="mt-1.5 text-[10px] uppercase tracking-[0.24em] text-dim">
                              {r.category} pillar
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 text-[11px] uppercase tracking-[0.16em] text-mist">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1.5">
                              <CalendarDays className="size-3.5 text-accent" strokeWidth={1.6} />
                              {r.dayLabel}
                            </span>
                            <span className="flex items-center gap-1.5 text-dim">
                              <Clock className="size-3.5" strokeWidth={1.6} />
                              {r.timeLabel}
                            </span>
                          </div>
                          <a
                            href={createGoogleCalendarUrl(
                              {
                                position: r.position,
                                isoDate: r.isoDate,
                                dayLabel: r.dayLabel,
                                timeLabel: r.timeLabel,
                                pillar: r.pillar,
                                category: r.category,
                                caption: r.caption,
                                visualDirection: r.visualDirection,
                                hashtags: r.hashtags,
                              },
                              { brandName: plan.brandName, industryLabel: industry?.label }
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-[10px] tracking-wider text-accent transition-colors hover:border-accent"
                          >
                            <Calendar className="size-3" />
                            <span>Add to GCal</span>
                          </a>
                        </div>
                      </header>

                      {/* caption */}
                      <div className="px-7 pt-7 sm:px-9">
                        <div className="flex items-center justify-between gap-3">
                          <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-dim">
                            <Type className="size-3.5" strokeWidth={1.6} />
                            Caption
                            <span className="text-dim/60">· {words} words</span>
                          </p>
                          <div className="flex gap-2">
                            <CopyButton text={fullPost} label="Copy post" copiedLabel="Copied" />
                            <CopyButton text={r.caption} label="Caption" copiedLabel="Copied" />
                          </div>
                        </div>
                        <p className="mt-4 whitespace-pre-line font-display text-[16.5px] leading-[1.75] text-cream/95">
                          {r.caption}
                        </p>
                      </div>

                      {/* visual */}
                      <div className="mx-7 mt-8 overflow-hidden rounded-2xl border border-line bg-white/[0.02] p-6 sm:mx-9">
                        <div className="flex items-center justify-between gap-3">
                          <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-dim">
                            <Clapperboard className="size-3.5" strokeWidth={1.6} />
                            Visual direction
                          </p>
                          <CopyButton text={r.visualDirection} label="Copy" copiedLabel="Copied" />
                        </div>
                        <p className="mt-3 text-[13px] leading-[1.85] text-mist">
                          {r.visualDirection}
                        </p>
                      </div>

                      {/* hashtags */}
                      <div className="px-7 py-7 sm:px-9">
                        <div className="flex items-center justify-between gap-3">
                          <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-dim">
                            <Hash className="size-3.5" strokeWidth={1.6} />
                            Hashtags
                            <span className="text-dim/60">· {r.hashtags.length}</span>
                          </p>
                          <CopyButton text={r.hashtags.join(" ")} label="Copy all" copiedLabel="Copied" />
                        </div>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {r.hashtags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-line px-2.5 py-1 text-[10.5px] tracking-wide text-mist transition-colors group-hover:border-white/15"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}

              {isTeaser && rows.length > 1 && (
                <li className="relative mt-8 overflow-hidden rounded-3xl border border-line bg-panel p-12 text-center backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink/90 backdrop-blur-md" />
                  <div className="relative z-10 mx-auto max-w-md">
                    <Feather className="mx-auto mb-6 size-8 text-accent" strokeWidth={1.5} />
                    <h3 className="font-display text-3xl font-medium text-cream">
                      Unlock the full plan
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-mist">
                      You're previewing the first post of this generated strategy. 
                      Log in to access the remaining {rows.length - 1} posts and save this brief to your dashboard permanently.
                    </p>
                    <Link
                      href={`/login?returnTo=/plan/${plan.id}`}
                      className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink transition-all hover:bg-cream"
                    >
                      Login to Unlock & Save to Dashboard
                    </Link>
                  </div>
                </li>
              )}
            </ol>

            {/* end card */}
            <div
              data-reveal
              className="mt-12 rounded-3xl border border-dashed border-line p-10 text-center lg:ml-12"
            >
              <p className="font-display text-2xl italic text-mist">Fin.</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-dim">
                Every post above is publish-ready. Copy it, stage the visual, post at
                the suggested hour — then come back for the next chapter.
              </p>
              <Link
                href="/dashboard"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-ink transition-transform hover:scale-[1.03]"
              >
                <PenLine className="size-3.5" />
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
