"use client";

import {
  ArrowRight,
  Building2,
  Check,
  FileText,
  Gem,
  Loader2,
  PenLine,
  SprayCan,
  UtensilsCrossed,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { DurationKey, IndustryKey } from "@/lib/engine/types";

const INDUSTRY_OPTIONS: {
  key: IndustryKey;
  label: string;
  audience: string;
  pillars: string;
  icon: typeof Building2;
}[] = [
  {
    key: "real-estate",
    label: "Real Estate",
    audience: "Homebuyers · Investors · NRIs",
    pillars: "Location · Lifestyle · Investment · Design",
    icon: Building2,
  },
  {
    key: "jewellery",
    label: "Jewellery",
    audience: "Women · Gifters · Luxury buyers",
    pillars: "Craft · Occasion · Emotion · Legacy",
    icon: Gem,
  },
  {
    key: "perfume",
    label: "Perfume",
    audience: "Style-conscious · Enthusiasts",
    pillars: "Notes · Mood · Identity · Ritual",
    icon: SprayCan,
  },
  {
    key: "food",
    label: "FMCG / Food",
    audience: "Families · Everyday consumers",
    pillars: "Taste · Moments · Trust · Craving",
    icon: UtensilsCrossed,
  },
];

const DURATION_OPTIONS: { key: DurationKey; label: string; note: string }[] = [
  { key: "1w", label: "1 Week", note: "A focused sprint" },
  { key: "2w", label: "2 Weeks", note: "A steady rhythm" },
  { key: "1m", label: "1 Month", note: "A full editorial calendar" },
];

const COUNT_OPTIONS: { value: number; label: string; note: string }[] = [
  { value: 3, label: "3 Posts", note: "Essential" },
  { value: 6, label: "6 Posts", note: "Balanced" },
  { value: 12, label: "12 Posts", note: "Editorial" },
];

const STAGES = [
  "Reading your brand voice…",
  "Mapping content pillars across the calendar…",
  "Writing captions in your industry's dialect…",
  "Art-directing visuals and sourcing hashtags…",
  "Binding the plan for delivery…",
];

export interface ConfiguratorProps {
  onPlanCreated?: (planId: string) => void;
}

export function Configurator({ onPlanCreated }: ConfiguratorProps = {}) {
  const router = useRouter();
  const [industry, setIndustry] = useState<IndustryKey>("real-estate");
  const [duration, setDuration] = useState<DurationKey>("2w");
  const [postCount, setPostCount] = useState<number>(6);
  const [brandName, setBrandName] = useState("");
  const [reference, setReference] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (loading) {
      setStage(0);
      timer.current = setInterval(
        () => setStage((s) => Math.min(s + 1, STAGES.length - 1)),
        700,
      );
      return () => {
        if (timer.current) clearInterval(timer.current);
      };
    }
  }, [loading]);

  const industryLabel = useMemo(
    () => INDUSTRY_OPTIONS.find((i) => i.key === industry)?.label ?? "",
    [industry],
  );
  const durationLabel = useMemo(
    () => DURATION_OPTIONS.find((d) => d.key === duration)?.label ?? "",
    [duration],
  );

  async function submit() {
    setError(null);
    setLoading(true);
    const started = Date.now();
    try {
      const formData = new FormData();
      formData.append("industry", industry);
      formData.append("duration", duration);
      formData.append("postCount", String(postCount));
      formData.append("brandName", brandName);
      formData.append("reference", reference);
      files.forEach((f) => formData.append("files", f));

      const res = await fetch("/api/plans", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "The studio couldn't compose this plan.");
      }
      const data = (await res.json()) as { id: string };
      const elapsed = Date.now() - started;
      await new Promise((r) => setTimeout(r, Math.max(0, 3600 - elapsed)));
      if (onPlanCreated) {
        setLoading(false);
        onPlanCreated(data.id);
      } else {
        router.push(`/plan/${data.id}`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setLoading(false);
    }
  }

  const stepLabel = (n: string, title: string, hint: string) => (
    <div className="mb-6 flex items-baseline gap-4">
      <span className="font-display text-sm italic text-accent">{n}</span>
      <div>
        <h3 className="font-display text-xl font-medium tracking-wide sm:text-2xl">{title}</h3>
        <p className="mt-1 text-xs text-dim">{hint}</p>
      </div>
    </div>
  );

  return (
    <div className={`scope-${industry} relative`}>
      {/* loading overlay */}
      {loading && (
        <div className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ink/95 px-6 backdrop-blur-md">
          <span className="font-display text-[11px] uppercase tracking-[0.4em] text-dim">
            Social Atelier
          </span>
          <div className="mt-8 flex items-center gap-3">
            <Loader2 className="size-5 animate-spin text-accent" strokeWidth={1.5} />
            <p className="font-display text-2xl italic text-cream sm:text-3xl" key={stage}>
              {STAGES[stage]}
            </p>
          </div>
          <div className="mt-10 flex gap-2">
            {STAGES.map((_, i) => (
              <span
                key={i}
                className={`h-px w-10 transition-colors duration-500 ${
                  i <= stage ? "bg-accent" : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-16">
        {/* 01 — industry */}
        <section data-reveal id="industries" className="scroll-mt-28">
          {stepLabel("01", "Choose your industry", "Four dialects. Each plan speaks one fluently.")}
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {INDUSTRY_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const active = industry === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setIndustry(opt.key)}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-6 text-left transition-all duration-300 ${
                    active
                      ? "border-accent bg-white/[0.045]"
                      : "border-line bg-white/[0.015] hover:border-white/25 hover:bg-white/[0.03]"
                  }`}
                >
                  <div
                    className={`accent-glow pointer-events-none absolute -right-10 -top-10 size-40 rounded-full transition-opacity duration-500 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <span
                        className={`flex size-10 items-center justify-center rounded-full border transition-colors ${
                          active ? "border-accent text-accent" : "border-line text-mist"
                        }`}
                      >
                        <Icon className="size-[18px]" strokeWidth={1.5} />
                      </span>
                      <span
                        className={`flex size-5 items-center justify-center rounded-full border transition-all ${
                          active
                            ? "border-accent bg-accent text-ink"
                            : "border-line text-transparent"
                        }`}
                      >
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                    </div>
                    <h4 className="mt-6 font-display text-2xl font-medium">{opt.label}</h4>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-dim">
                      {opt.audience}
                    </p>
                    <p className="mt-4 border-t border-line pt-3 text-[11px] leading-relaxed text-mist">
                      {opt.pillars}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 02 — duration */}
        <section data-reveal>
          {stepLabel("02", "Set the duration", "Posts are spaced logically across the calendar.")}
          <div className="grid gap-3 sm:grid-cols-3">
            {DURATION_OPTIONS.map((opt) => {
              const active = duration === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setDuration(opt.key)}
                  className={`group cursor-pointer rounded-2xl border p-5 text-left transition-all duration-300 ${
                    active
                      ? "border-accent bg-white/[0.045]"
                      : "border-line bg-white/[0.015] hover:border-white/25"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl font-medium">{opt.label}</span>
                    <span
                      className={`flex size-5 items-center justify-center rounded-full border transition-all ${
                        active ? "border-accent bg-accent text-ink" : "border-line text-transparent"
                      }`}
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-dim">{opt.note}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* 03 — volume */}
        <section data-reveal>
          {stepLabel("03", "Decide the volume", "A strategic mix of pillars, never the same angle twice in a row.")}
          <div className="grid gap-3 sm:grid-cols-3">
            {COUNT_OPTIONS.map((opt) => {
              const active = postCount === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPostCount(opt.value)}
                  className={`group cursor-pointer rounded-2xl border p-5 text-left transition-all duration-300 ${
                    active
                      ? "border-accent bg-white/[0.045]"
                      : "border-line bg-white/[0.015] hover:border-white/25"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl font-medium">{opt.label}</span>
                    <span
                      className={`flex size-5 items-center justify-center rounded-full border transition-all ${
                        active ? "border-accent bg-accent text-ink" : "border-line text-transparent"
                      }`}
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-dim">{opt.note}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* 04 — brand voice */}
        <section data-reveal>
          {stepLabel(
            "04",
            "Feed the brand voice",
            "Optional, but powerful — reference material becomes the factual source of truth.",
          )}
          <div className="grid gap-3 lg:grid-cols-[1fr_1.6fr]">
            <label className="group block rounded-2xl border border-[var(--accent)] bg-white/[0.015] p-5 transition-colors focus-within:border-[var(--accent)]">
              <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-dim">
                <PenLine className="size-3.5" strokeWidth={1.5} />
                Brand name
              </span>
              <input
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Maison Aira"
                maxLength={80}
                className="mt-3 w-full bg-transparent font-display text-2xl text-cream placeholder:text-white/20 focus:outline-none"
              />
              <p className="mt-3 text-[11px] leading-relaxed text-dim">
                Woven into captions, sign-offs and branded hashtags.
              </p>
            </label>
            <label className="group block rounded-2xl border border-[var(--accent)] bg-white/[0.015] p-5 transition-colors focus-within:border-[var(--accent)]">
              <span className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-dim">
                <span className="flex items-center gap-2">
                  <FileText className="size-3.5" strokeWidth={1.5} />
                  Reference material
                </span>
                <span className="text-dim/60">{reference.length}/8000</span>
              </span>
              <textarea
                value={reference}
                onChange={(e) => setReference(e.target.value.slice(0, 8000))}
                placeholder={
                  "Paste product details, features, prices, locations, ingredients, tone examples…\n\nThe strategist extracts real facts and weaves them into the plan."
                }
                rows={5}
                className="mt-3 w-full resize-none bg-transparent text-sm leading-relaxed text-cream placeholder:text-white/20 focus:outline-none"
              />
              <div className="mt-4 border-t border-line pt-4">
                <label className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-dim">
                  Attach files (PDF, DOC, PPT, XLS, TXT, Images)
                </label>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setFiles(Array.from(e.target.files));
                    }
                  }}
                  className="block w-full text-xs text-mist file:mr-4 file:rounded-full file:border-0 file:bg-white/5 file:px-4 file:py-2 file:text-xs file:font-medium file:text-cream hover:file:bg-white/10"
                />
              </div>
            </label>
          </div>
        </section>

        {/* submit */}
        <section data-reveal className="border-t border-line pt-10">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <p className="text-sm text-mist">
              <span className="text-dim">Your brief:</span>{" "}
              <span className="text-cream">
                {postCount} posts · {industryLabel} · {durationLabel}
              </span>
              {brandName.trim() && (
                <>
                  {" "}
                  <span className="text-dim">for</span>{" "}
                  <span className="font-display italic text-accent">{brandName.trim()}</span>
                </>
              )}
            </p>
            <button
              type="button"
              onClick={submit}
              disabled={loading}
              className="group relative inline-flex cursor-pointer items-center gap-3 overflow-hidden rounded-full bg-accent px-8 py-4 text-[12px] font-medium uppercase tracking-[0.24em] text-ink transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99] disabled:opacity-60"
            >
              Compose my plan
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        </section>
      </div>
    </div>
  );
}
