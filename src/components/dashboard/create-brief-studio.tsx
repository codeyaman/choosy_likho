"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  Building2,
  Gem,
  SprayCan,
  UtensilsCrossed,
  Calendar,
  Clock,
  Check,
  FileText,
  UploadCloud,
  X,
  Sparkles,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Info,
  TrendingUp,
  Share2,
  Compass,
  Lightbulb,
} from "lucide-react";
import { INDUSTRIES, DURATIONS } from "@/lib/engine";
import type { DurationKey, IndustryKey } from "@/lib/engine/types";

export interface CreateBriefStudioProps {
  onPlanCreated: (planId: string) => void;
  onCancel?: () => void;
}

const INDUSTRY_PROFILES: {
  key: IndustryKey;
  label: string;
  tagline: string;
  dialectDescription: string;
  targetAudience: string;
  primaryPillars: string[];
  icon: typeof Building2;
}[] = [
  {
    key: "real-estate",
    label: "Real Estate",
    tagline: "Consultative Authority & Architectural Prestige",
    dialectDescription: "Spoken like an investment consultant. Grounded in square footage, heritage neighborhoods, natural light, and capital appreciation.",
    targetAudience: "High-Net-Worth Buyers · Global Investors · Relocating Executives",
    primaryPillars: ["Location DNA", "Architectural Spotlight", "Lifestyle & Heritage", "Capital Value"],
    icon: Building2,
  },
  {
    key: "jewellery",
    label: "Jewellery",
    tagline: "Poetic Storytelling & Generational Heirlooms",
    dialectDescription: "Spoken like an intimate storyteller. Honors the weight of gold, cut of stone, romantic occasions, and timeless emotional value.",
    targetAudience: "Discerning Women · Thoughtful Gifters · Connoisseurs",
    primaryPillars: ["Craft & Karat", "Emotional Milestone", "Occasion Styling", "Generational Legacy"],
    icon: Gem,
  },
  {
    key: "perfume",
    label: "Perfume",
    tagline: "Sensory Evocation & Olfactory Identity",
    dialectDescription: "Spoken like a poet. Transposes invisible sillage into vivid memories, raw note pyramids, intimate rituals, and mood projection.",
    targetAudience: "Fragrance Enthusiasts · Style-Conscious Individuals",
    primaryPillars: ["Top & Base Notes", "Atmosphere & Mood", "Identity & Signature", "Private Ritual"],
    icon: SprayCan,
  },
  {
    key: "food",
    label: "FMCG / Food",
    tagline: "Appetite Induction & Household Warmth",
    dialectDescription: "Spoken like a household name. Crisp sensory cravings, clean origin stories, family table rituals, and unpretentious flavor.",
    targetAudience: "Everyday Consumers · Modern Families · Food Lovers",
    primaryPillars: ["Sensory Taste", "Table Moments", "Ingredient Integrity", "Irresistible Craving"],
    icon: UtensilsCrossed,
  },
];

const DURATION_CONFIGS: {
  key: DurationKey;
  label: string;
  span: string;
  recommendedFor: string;
}[] = [
  { key: "1w", label: "1 Week Sprint", span: "7 Days", recommendedFor: "Product Drop / Focused Campaign" },
  { key: "2w", label: "2 Weeks Cadence", span: "14 Days", recommendedFor: "Balanced Algorithm Retention" },
  { key: "1m", label: "1 Month Calendar", span: "30 Days", recommendedFor: "Full Editorial Publishing Roadmap" },
];

const VOLUME_CONFIGS: {
  value: number;
  label: string;
  rhythm: string;
  rationale: string;
}[] = [
  { value: 3, label: "3 High-Impact Posts", rhythm: "Concentrated Impact", rationale: "Essential narrative anchors with zero filler." },
  { value: 6, label: "6 Strategic Posts", rhythm: "Every 2–3 Days", rationale: "The sweet spot for narrative rotation and community engagement." },
  { value: 12, label: "12 Editorial Posts", rhythm: "Comprehensive Cadence", rationale: "Complete multi-angle coverage for sustained presence." },
];

const GENERATION_STAGES = [
  "Absorbing reference DNA & brand voice...",
  "Calibrating industry dialect & tone constraints...",
  "Orchestrating strategic pillar rotation across the calendar...",
  "Art-directing visual storyboards & framing guidelines...",
  "Writing thumb-stopping hooks, captions & hashtag clusters...",
  "Binding the complete publish-ready blueprint...",
];

export function CreateBriefStudio({ onPlanCreated, onCancel }: CreateBriefStudioProps) {
  const [industry, setIndustry] = useState<IndustryKey>("real-estate");
  const [duration, setDuration] = useState<DurationKey>("2w");
  const [postCount, setPostCount] = useState<number>(6);
  const [brandName, setBrandName] = useState("");
  const [reference, setReference] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setStageIndex(0);
      interval = setInterval(() => {
        setStageIndex((prev) => (prev < GENERATION_STAGES.length - 1 ? prev + 1 : prev));
      }, 900);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const activeProfile = useMemo(
    () => INDUSTRY_PROFILES.find((p) => p.key === industry) || INDUSTRY_PROFILES[0],
    [industry]
  );

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...droppedFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    const started = Date.now();

    try {
      const formData = new FormData();
      formData.append("industry", industry);
      formData.append("duration", duration);
      formData.append("postCount", String(postCount));
      formData.append("brandName", brandName.trim());
      formData.append("reference", reference.trim());
      files.forEach((f) => formData.append("files", f));

      const res = await fetch("/api/plans", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Strategy engine encountered an unexpected issue.");
      }

      const data = (await res.json()) as { id: string };
      const elapsed = Date.now() - started;
      await new Promise((r) => setTimeout(r, Math.max(0, 3200 - elapsed)));

      onPlanCreated(data.id);
    } catch (err: any) {
      setError(err.message || "Failed to generate content strategy brief.");
      setLoading(false);
    }
  };

  return (
    <div className={`scope-${industry} relative`}>
      {/* Dynamic Processing Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink/95 px-6 backdrop-blur-xl">
          <div className="relative flex flex-col items-center max-w-lg text-center">
            <div className="relative mb-6">
              <div className="size-16 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
              <Sparkles className="absolute inset-0 m-auto size-6 text-accent animate-pulse" />
            </div>

            <span className="text-[10px] uppercase tracking-[0.35em] text-accent font-medium">
              Atelier Neural Engine Active
            </span>

            <h3 className="mt-4 font-display text-2xl sm:text-3xl text-cream font-medium">
              {GENERATION_STAGES[stageIndex]}
            </h3>

            <p className="mt-3 text-xs text-mist leading-relaxed max-w-sm">
              Crafting bespoke captions, platform-tuned hashtags, and art-directed visual storyboards for{" "}
              <span className="text-cream font-medium">{brandName.trim() || activeProfile.label}</span>.
            </p>

            <div className="mt-8 flex gap-1.5 w-full max-w-xs">
              {GENERATION_STAGES.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                    i <= stageIndex ? "bg-accent" : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Studio Grid: Left Builder (60%), Right Director Console (40%) */}
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* LEFT COLUMN: Interactive Builder */}
        <div className="space-y-10">
          {/* Section 01: Industry Dialect */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex size-6 items-center justify-center rounded-full bg-accent text-ink text-[11px] font-bold">
                1
              </span>
              <div>
                <h3 className="font-display text-xl text-cream font-medium">
                  Select Industry Dialect
                </h3>
                <p className="text-xs text-dim">
                  Each industry communicates with distinct vocabulary, pacing, and emotional drivers.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {INDUSTRY_PROFILES.map((profile) => {
                const Icon = profile.icon;
                const isSelected = industry === profile.key;
                return (
                  <button
                    key={profile.key}
                    type="button"
                    onClick={() => setIndustry(profile.key)}
                    className={`relative cursor-pointer rounded-2xl border p-5 text-left transition-all duration-300 ${
                      isSelected
                        ? "border-accent bg-accent/[0.06] shadow-lg shadow-black/40"
                        : "border-line bg-white/[0.015] hover:border-white/20 hover:bg-white/[0.025]"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex size-9 items-center justify-center rounded-xl border transition-colors ${
                          isSelected ? "border-accent text-accent bg-accent/10" : "border-line text-mist"
                        }`}
                      >
                        <Icon className="size-4" strokeWidth={1.7} />
                      </div>
                      <span
                        className={`flex size-4 items-center justify-center rounded-full border transition-all ${
                          isSelected ? "border-accent bg-accent text-ink" : "border-line text-transparent"
                        }`}
                      >
                        <Check className="size-2.5" strokeWidth={3} />
                      </span>
                    </div>

                    <h4 className="mt-4 font-display text-lg font-medium text-cream">
                      {profile.label}
                    </h4>
                    <p className="mt-1 text-[11px] text-accent font-medium leading-tight">
                      {profile.tagline}
                    </p>
                    <p className="mt-2 text-[11px] text-mist leading-relaxed line-clamp-2">
                      {profile.dialectDescription}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 02: Cadence & Strategic Volume */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex size-6 items-center justify-center rounded-full bg-accent text-ink text-[11px] font-bold">
                2
              </span>
              <div>
                <h3 className="font-display text-xl text-cream font-medium">
                  Publishing Cadence & Volume
                </h3>
                <p className="text-xs text-dim">
                  Strategic spacing avoids creative repetition and optimizes audience retention.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Duration Options */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-dim block mb-2 font-medium">
                  Campaign Duration
                </label>
                <div className="grid gap-2.5 sm:grid-cols-3">
                  {DURATION_CONFIGS.map((cfg) => {
                    const isSelected = duration === cfg.key;
                    return (
                      <button
                        key={cfg.key}
                        type="button"
                        onClick={() => setDuration(cfg.key)}
                        className={`rounded-xl border p-3.5 text-left transition-all ${
                          isSelected
                            ? "border-accent bg-accent/[0.08]"
                            : "border-line bg-white/[0.015] hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-cream">{cfg.label}</span>
                          {isSelected && <Check className="size-3 text-accent" strokeWidth={3} />}
                        </div>
                        <span className="mt-1 block text-[10px] text-dim">{cfg.recommendedFor}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Volume Options */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-dim block mb-2 font-medium">
                  Volume of Posts
                </label>
                <div className="grid gap-2.5 sm:grid-cols-3">
                  {VOLUME_CONFIGS.map((cfg) => {
                    const isSelected = postCount === cfg.value;
                    return (
                      <button
                        key={cfg.value}
                        type="button"
                        onClick={() => setPostCount(cfg.value)}
                        className={`rounded-xl border p-3.5 text-left transition-all ${
                          isSelected
                            ? "border-accent bg-accent/[0.08]"
                            : "border-line bg-white/[0.015] hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-cream">{cfg.label}</span>
                          {isSelected && <Check className="size-3 text-accent" strokeWidth={3} />}
                        </div>
                        <span className="mt-1 block text-[10px] text-dim">{cfg.rhythm}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Section 03: Brand Voice & Reference DNA */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex size-6 items-center justify-center rounded-full bg-accent text-ink text-[11px] font-bold">
                3
              </span>
              <div>
                <h3 className="font-display text-xl text-cream font-medium">
                  Brand Voice & Contextual DNA
                </h3>
                <p className="text-xs text-dim">
                  Feed real facts, prices, tone guidelines, or upload existing collateral.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Brand Name */}
              <div className="rounded-2xl border border-line bg-white/[0.015] p-4 transition-colors focus-within:border-accent">
                <label className="text-[10px] uppercase tracking-wider text-dim block font-medium">
                  Brand / Studio Name
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g. Aurelia Living, Maison Valmont, Saffron Co."
                  maxLength={80}
                  className="mt-2 w-full bg-transparent font-display text-xl text-cream placeholder:text-dim/40 focus:outline-none"
                />
              </div>

              {/* Reference Text */}
              <div className="rounded-2xl border border-line bg-white/[0.015] p-4 transition-colors focus-within:border-accent">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-dim font-medium mb-2">
                  <span>Reference Material & Product Details</span>
                  <span className="text-dim/60">{reference.length}/8000</span>
                </div>
                <textarea
                  value={reference}
                  onChange={(e) => setReference(e.target.value.slice(0, 8000))}
                  placeholder="Paste product features, key selling points, launch dates, prices, tone guides, or target demographics here. The AI weaves these actual facts into every caption."
                  rows={4}
                  className="w-full resize-none bg-transparent text-xs leading-relaxed text-cream placeholder:text-dim/40 focus:outline-none"
                />
              </div>

              {/* Document Dropzone */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                className="group cursor-pointer rounded-2xl border border-dashed border-line bg-white/[0.01] p-6 text-center transition-all hover:border-accent hover:bg-accent/[0.02]"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <UploadCloud className="mx-auto size-6 text-dim transition-colors group-hover:text-accent" />
                <p className="mt-2 text-xs font-medium text-cream">
                  Click or drag brand files here to upload
                </p>
                <p className="mt-1 text-[10px] text-dim">
                  Supports PDF pitch decks, Word docs, Excel spreadsheets, Text notes, or Moodboard images
                </p>
              </div>

              {/* Uploaded File Chips */}
              {files.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-mist"
                    >
                      <FileText className="size-3 text-accent" />
                      <span className="max-w-[150px] truncate text-[11px]">{file.name}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(idx);
                        }}
                        className="text-dim hover:text-red-400 transition-colors"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 border-t border-line">
            {error && (
              <p className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
                {error}
              </p>
            )}

            <div className="flex items-center justify-between gap-4">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="rounded-full border border-line px-5 py-3 text-xs uppercase tracking-wider text-dim hover:text-cream"
                >
                  Return to Briefs
                </button>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="group relative ml-auto inline-flex cursor-pointer items-center gap-2.5 overflow-hidden rounded-full bg-accent px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-ink transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 shadow-xl"
              >
                <Sparkles className="size-4" />
                <span>Commission Strategy Blueprint</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Creative Director Console (Live Inspector) */}
        <div className="space-y-6">
          <div className="sticky top-28 rounded-3xl border border-line bg-ink/80 p-6 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2">
                <Compass className="size-4 text-accent" />
                <span className="text-[11px] uppercase tracking-[0.24em] text-cream font-medium">
                  Director's Brief Inspector
                </span>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Preview
              </span>
            </div>

            {/* Selected Profile Highlight */}
            <div className="mt-5 space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-dim block">
                  Chosen Persona
                </span>
                <p className="mt-1 font-display text-xl text-cream">
                  {brandName.trim() ? (
                    <>
                      <span className="text-accent">{brandName.trim()}</span>{" "}
                      <span className="text-dim text-sm font-sans">({activeProfile.label})</span>
                    </>
                  ) : (
                    activeProfile.label
                  )}
                </p>
                <p className="mt-1 text-xs text-mist leading-relaxed">
                  {activeProfile.tagline}
                </p>
              </div>

              {/* Target Audience */}
              <div className="border-t border-line/60 pt-3">
                <span className="text-[10px] uppercase tracking-wider text-dim block">
                  Target Demographic
                </span>
                <p className="mt-1 text-xs text-cream/90 font-medium">
                  {activeProfile.targetAudience}
                </p>
              </div>

              {/* Cadence Metrics */}
              <div className="grid grid-cols-2 gap-3 border-t border-line/60 pt-3">
                <div className="rounded-xl border border-line bg-white/[0.02] p-3">
                  <span className="text-[10px] uppercase tracking-wider text-dim block">
                    Duration
                  </span>
                  <span className="mt-1 block font-display text-lg text-cream">
                    {DURATIONS[duration].label}
                  </span>
                  <span className="text-[10px] text-dim">{DURATIONS[duration].days} calendar days</span>
                </div>

                <div className="rounded-xl border border-line bg-white/[0.02] p-3">
                  <span className="text-[10px] uppercase tracking-wider text-dim block">
                    Total Volume
                  </span>
                  <span className="mt-1 block font-display text-lg text-accent">
                    {postCount} Posts
                  </span>
                  <span className="text-[10px] text-dim">
                    ~{(postCount / (DURATIONS[duration].days / 7)).toFixed(1)} posts / week
                  </span>
                </div>
              </div>

              {/* Strategic Pillars To Be Generated */}
              <div className="border-t border-line/60 pt-3">
                <span className="text-[10px] uppercase tracking-wider text-dim block mb-2">
                  Rotating Strategy Pillars
                </span>
                <div className="space-y-2">
                  {activeProfile.primaryPillars.map((pillar, idx) => (
                    <div
                      key={pillar}
                      className="flex items-center justify-between text-xs text-mist bg-white/[0.02] border border-line rounded-lg px-2.5 py-1.5"
                    >
                      <span className="text-[11px] font-medium text-cream">{pillar}</span>
                      <span className="text-[10px] text-dim">Pillar #{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Deliverables Guarantee */}
              <div className="rounded-2xl border border-accent/20 bg-accent/[0.03] p-4 text-xs space-y-2">
                <div className="flex items-center gap-2 text-accent font-medium text-[11px] uppercase tracking-wider">
                  <ShieldCheck className="size-3.5" />
                  <span>Atelier Production Guarantee</span>
                </div>
                <ul className="text-[11px] text-mist space-y-1 pl-4 list-disc marker:text-accent">
                  <li>Full thumb-stopping captions with hook & CTA</li>
                  <li>Art-directed framing & photography notes</li>
                  <li>Exact day & optimal hour scheduling</li>
                  <li>Instant 1-click Google Calendar sync & .ics export</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
