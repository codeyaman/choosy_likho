import { desc } from "drizzle-orm";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Clock,
  Compass,
  Dna,
  PenLine,
  Quote,
  Send,
} from "lucide-react";
import Link from "next/link";
import { Configurator } from "@/components/configurator";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { Reveal } from "@/components/reveal";
import { db } from "@/db";
import { plans } from "@/db/schema";
import { DURATIONS, INDUSTRIES } from "@/lib/engine";

export const dynamic = "force-dynamic";

const METHOD = [
  {
    no: "I",
    icon: Dna,
    title: "Industry DNA",
    text: "Real Estate is spoken like a consultant, Jewellery like a storyteller, Perfume like a poet, Food like a household name. No generic filler, ever.",
  },
  {
    no: "II",
    icon: Compass,
    title: "Strategic mix",
    text: "Product spotlights, emotional stories, education, occasions, engagement and value — rotated so the same angle never lands twice in a row.",
  },
  {
    no: "III",
    icon: PenLine,
    title: "Your brand voice",
    text: "Reference material is treated as the source of truth. Real names, features, prices and places are extracted and woven into the copy.",
  },
  {
    no: "IV",
    icon: Send,
    title: "Publish-ready",
    text: "Every post arrives with a caption, precise visual direction, hashtags, a suggested date and a posting time. Copy, download, ship.",
  },
];

const DATE_FMT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
});

async function getRecentPlans() {
  try {
    return await db.select().from(plans).orderBy(desc(plans.createdAt)).limit(6);
  } catch {
    return [];
  }
}

export default async function Home() {
  const recent = await getRecentPlans();

  return (
    <div className="scope-real-estate min-h-screen">
      <SiteHeader />
      <Reveal />

      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden px-5 pb-20 pt-36 sm:px-8 lg:pt-44">
        <div className="accent-glow pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-end gap-14 lg:grid-cols-[1.35fr_1fr]">
            <div>
              <p data-reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.34em] text-mist">
                <span className="inline-block size-1.5 rounded-full bg-accent" />
                Elite content strategy · Four industries · One studio
              </p>
              <h1
                data-reveal
                style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
                className="mt-8 font-display text-[13.5vw] font-medium leading-[0.98] tracking-[-0.02em] sm:text-7xl lg:text-[86px]"
              >
                A calendar of scroll-stopping posts,{" "}
                <em className="text-accent">art-directed</em> in seconds.
              </h1>
              <p
                data-reveal
                style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
                className="mt-8 max-w-xl text-[15px] leading-relaxed text-mist"
              >
                Choose your industry, set the cadence, feed us your brand notes.
                The Atelier returns a complete, ready-to-publish social media plan —
                captions with hooks that stop thumbs, visual direction a designer can
                execute blind, and hashtags tuned for reach.
              </p>
              <div
                data-reveal
                style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#brief"
                  className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-ink transition-transform duration-300 hover:scale-[1.03]"
                >
                  Start your brief
                  <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
                </a>
                <a
                  href="#method"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-[12px] uppercase tracking-[0.22em] text-mist transition-colors hover:border-white/30 hover:text-cream"
                >
                  The method
                </a>
              </div>
            </div>

            {/* specimen card */}
            <div data-reveal style={{ "--reveal-delay": "220ms" } as React.CSSProperties} className="relative hidden lg:block">
              <div className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-white/[0.06] to-transparent" />
              <div className="relative rounded-3xl border border-line bg-panel p-7 shadow-2xl shadow-black/50 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl italic text-accent">03</span>
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-dim">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="size-3" /> Fri, 19 Jun
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3" /> 7:30 PM
                    </span>
                  </div>
                </div>
                <p className="mt-5 font-display text-[17px] leading-relaxed text-cream">
                  “For the one who leaves before the party ends — and is
                  remembered after.”
                </p>
                <p className="mt-3 text-[12.5px] leading-relaxed text-mist">
                  Fragrance is the one luxury invisible from across the room —
                  and unforgettable from across the pillow. Wear it for the
                  people you let close.
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {["#SignatureScent", "#NicheFragrance", "#EffortlessElegance", "#ScentIdentity"].map((t) => (
                    <span key={t} className="rounded-full border border-line px-2.5 py-1 text-[10px] tracking-wide text-dim">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 rounded-b-3xl bg-gradient-to-t from-ink via-ink/85 to-transparent" />
              </div>
              <p className="mt-4 text-center text-[10px] uppercase tracking-[0.3em] text-dim">
                Specimen · Perfume · Emotional pillar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- marquee ---------- */}
      <section className="overflow-hidden border-y border-line py-5">
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-10" aria-hidden={dup === 1}>
              {[
                "Real Estate", "Jewellery", "Perfume", "FMCG / Food",
                "Captions", "Visual Direction", "Hashtags", "Cadence",
              ].map((word) => (
                <span key={`${dup}-${word}`} className="flex items-center gap-10">
                  <span className="font-display text-2xl italic text-cream/35">{word}</span>
                  <span className="size-1.5 rounded-full bg-accent/60" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- method ---------- */}
      <section id="method" className="scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="flex items-end justify-between gap-8">
            <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
              The <em className="text-accent">method</em>
            </h2>
            <p className="hidden max-w-xs text-right text-[11px] uppercase leading-relaxed tracking-[0.2em] text-dim sm:block">
              Four disciplines behind every plan we bind
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {METHOD.map((m, i) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.no}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                  className="group relative rounded-3xl border border-line bg-ink p-8 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:z-10"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg italic text-accent">{m.no}</span>
                    <Icon className="size-5 text-dim transition-colors group-hover:text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-14 font-display text-2xl font-medium">{m.title}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-mist">{m.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- the brief ---------- */}
      <section id="brief" className="scroll-mt-20 border-t border-line px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.34em] text-mist">
                <span className="inline-block size-1.5 rounded-full bg-accent" />
                The brief
              </p>
              <h2 className="mt-6 font-display text-4xl font-medium tracking-tight sm:text-6xl">
                Commission your <em className="text-accent">content plan</em>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-mist">
              Four decisions, one delivery. The strategist rotates pillars, spaces
              your dates and writes every word as if it already knows your brand.
            </p>
          </div>
          <Configurator />
        </div>
      </section>

      {/* ---------- recent briefs ---------- */}
      <section id="briefs" className="scroll-mt-24 border-t border-line px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="flex items-end justify-between">
            <h2 className="flex items-center gap-4 font-display text-3xl font-medium tracking-tight sm:text-4xl">
              <Quote className="size-6 text-accent" strokeWidth={1.5} />
              Recent briefs
            </h2>
            <span className="text-[11px] uppercase tracking-[0.24em] text-dim">
              Bound by the studio
            </span>
          </div>

          {recent.length === 0 ? (
            <p data-reveal className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center text-sm text-dim">
              The archive is empty — your plan will be the first one bound.
            </p>
          ) : (
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {recent.map((p, i) => {
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
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
