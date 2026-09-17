"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  Building2,
  Gem,
  SprayCan,
  UtensilsCrossed,
  Check,
  FileText,
  UploadCloud,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { DURATIONS } from "@/lib/engine";
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
    <div className={`scope-${industry} relative min-h-screen bg-ink selection:bg-accent/30 selection:text-cream`}>
      {/* Immersive Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink/90 backdrop-blur-2xl transition-all duration-700">
          <div className="relative flex flex-col items-center max-w-xl text-center px-6">
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl animate-pulse" />
              <div className="relative size-20 rounded-full border border-accent/30 border-t-accent animate-spin" />
              <Sparkles className="absolute inset-0 m-auto size-7 text-accent animate-pulse" />
            </div>

            <span className="text-[11px] uppercase tracking-[0.4em] text-accent font-medium mb-4 block">
              Atelier Neural Engine Active
            </span>

            <h3 className="font-display text-3xl sm:text-4xl text-cream font-medium tracking-tight h-20 flex items-center justify-center transition-opacity duration-500">
              {GENERATION_STAGES[stageIndex]}
            </h3>

            <div className="w-full h-[2px] bg-white/5 rounded-full mt-10 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-accent/50 via-accent to-accent/50 transition-all duration-1000 ease-out"
                style={{ width: `${((stageIndex + 1) / GENERATION_STAGES.length) * 100}%` }}
              />
            </div>
            
            <p className="mt-6 text-sm text-mist/80 max-w-md font-light leading-relaxed">
              Curating bespoke editorial direction for <span className="text-cream font-medium">{brandName.trim() || activeProfile.label}</span>. This may take a moment.
            </p>
          </div>
        </div>
      )}

      {/* Main Studio Canvas */}
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        
        {/* Header Section */}
        <div className="mb-14 max-w-3xl">
          <button 
            onClick={onCancel}
            className="group flex items-center gap-2 text-[11px] uppercase tracking-widest text-dim hover:text-cream transition-colors mb-8"
          >
            <ArrowRight className="size-3.5 rotate-180 transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
          </button>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-cream font-medium tracking-tight mb-4">
            Studio <span className="text-accent italic pr-2">Atelier</span>
          </h1>
          <p className="text-mist text-lg sm:text-xl font-light max-w-2xl leading-relaxed">
            Configure your bespoke content strategy. Our neural engine will architect a comprehensive, ready-to-publish brief tailored to your exact brand DNA.
          </p>
        </div>

        <div className="grid gap-12 lg:gap-16 lg:grid-cols-[1.8fr_1fr] items-start">
          
          {/* LEFT COLUMN: The Builder */}
          <div className="space-y-16">
            
            {/* Section 01: Industry Dialect */}
            <section className="relative">
              <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-line to-transparent hidden md:block" />
              <div className="flex items-center gap-4 mb-8">
                <span className="flex size-8 items-center justify-center rounded-full bg-accent text-ink text-xs font-bold shadow-[0_0_15px_rgba(201,169,126,0.3)]">
                  1
                </span>
                <div>
                  <h3 className="font-display text-2xl text-cream">Industry Dialect</h3>
                  <p className="text-sm text-dim mt-1 font-light">Select the foundational tone and vocabulary for your strategy.</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {INDUSTRY_PROFILES.map((profile) => {
                  const Icon = profile.icon;
                  const isSelected = industry === profile.key;
                  return (
                    <button
                      key={profile.key}
                      type="button"
                      onClick={() => setIndustry(profile.key)}
                      className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-6 text-left transition-all duration-500 ${
                        isSelected
                          ? "border-accent bg-accent/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
                          : "border-white/5 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.03]"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-50" />
                      )}
                      
                      <div className="relative z-10 flex items-start justify-between mb-5">
                        <div
                          className={`flex size-12 items-center justify-center rounded-2xl transition-all duration-500 ${
                            isSelected ? "bg-accent text-ink shadow-lg" : "bg-white/5 text-mist group-hover:bg-white/10 group-hover:text-cream"
                          }`}
                        >
                          <Icon className="size-6" strokeWidth={1.5} />
                        </div>
                        <div className={`flex size-6 items-center justify-center rounded-full border transition-all duration-300 ${
                          isSelected ? "border-accent bg-accent text-ink" : "border-white/10 text-transparent group-hover:border-white/30"
                        }`}>
                          <Check className="size-3.5" strokeWidth={3} />
                        </div>
                      </div>

                      <div className="relative z-10">
                        <h4 className={`font-display text-xl transition-colors ${isSelected ? "text-accent" : "text-cream"}`}>
                          {profile.label}
                        </h4>
                        <p className="mt-2 text-xs font-medium uppercase tracking-widest text-dim mb-3">
                          {profile.tagline}
                        </p>
                        <p className="text-sm text-mist/80 font-light leading-relaxed">
                          {profile.dialectDescription}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Section 02: Cadence & Strategic Volume */}
            <section className="relative">
              <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-line to-transparent hidden md:block" />
              <div className="flex items-center gap-4 mb-8">
                <span className="flex size-8 items-center justify-center rounded-full bg-accent text-ink text-xs font-bold shadow-[0_0_15px_rgba(201,169,126,0.3)]">
                  2
                </span>
                <div>
                  <h3 className="font-display text-2xl text-cream">Cadence & Volume</h3>
                  <p className="text-sm text-dim mt-1 font-light">Define the timeline and density of your content rollout.</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="text-[11px] uppercase tracking-[0.2em] text-dim block mb-4 font-medium flex items-center gap-2">
                    <span className="w-4 h-px bg-dim/40" /> Duration
                  </label>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {DURATION_CONFIGS.map((cfg) => {
                      const isSelected = duration === cfg.key;
                      return (
                        <button
                          key={cfg.key}
                          type="button"
                          onClick={() => setDuration(cfg.key)}
                          className={`group relative rounded-xl border p-4 text-left transition-all duration-300 ${
                            isSelected
                              ? "border-accent bg-accent/[0.05]"
                              : "border-white/5 bg-white/[0.01] hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`font-display text-lg ${isSelected ? "text-accent" : "text-cream"}`}>{cfg.label}</span>
                            {isSelected && <Check className="size-4 text-accent" strokeWidth={2.5} />}
                          </div>
                          <span className="block text-xs text-mist/70 font-light">{cfg.recommendedFor}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-[0.2em] text-dim block mb-4 font-medium flex items-center gap-2">
                    <span className="w-4 h-px bg-dim/40" /> Volume
                  </label>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {VOLUME_CONFIGS.map((cfg) => {
                      const isSelected = postCount === cfg.value;
                      return (
                        <button
                          key={cfg.value}
                          type="button"
                          onClick={() => setPostCount(cfg.value)}
                          className={`group relative rounded-xl border p-4 text-left transition-all duration-300 ${
                            isSelected
                              ? "border-accent bg-accent/[0.05]"
                              : "border-white/5 bg-white/[0.01] hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`font-display text-lg ${isSelected ? "text-accent" : "text-cream"}`}>{cfg.label}</span>
                            {isSelected && <Check className="size-4 text-accent" strokeWidth={2.5} />}
                          </div>
                          <span className="block text-xs text-mist/70 font-light">{cfg.rhythm}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 03: Brand Context */}
            <section className="relative">
              <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 to-transparent hidden md:block" />
              <div className="flex items-center gap-4 mb-8">
                <span className="flex size-8 items-center justify-center rounded-full bg-accent text-ink text-xs font-bold shadow-[0_0_15px_rgba(201,169,126,0.3)]">
                  3
                </span>
                <div>
                  <h3 className="font-display text-2xl text-cream">Brand Context</h3>
                  <p className="text-sm text-dim mt-1 font-light">Provide the raw material. The engine will refine it into compelling narratives.</p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="group rounded-2xl border border-white/10 bg-white/[0.01] p-5 transition-all duration-300 focus-within:border-accent focus-within:bg-white/[0.02]">
                  <label className="text-[11px] uppercase tracking-[0.2em] text-dim block font-medium group-focus-within:text-accent transition-colors">
                    Brand Name / Campaign Title
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="e.g. Maison Valmont Summer Collection"
                    maxLength={80}
                    className="mt-3 w-full bg-transparent font-display text-2xl text-cream placeholder:text-dim/30 focus:outline-none"
                  />
                </div>

                <div className="group rounded-2xl border border-white/10 bg-white/[0.01] p-5 transition-all duration-300 focus-within:border-accent focus-within:bg-white/[0.02]">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-dim font-medium mb-4 group-focus-within:text-accent transition-colors">
                    <span>Source Material & Key Details</span>
                    <span className="text-dim/50 font-sans tracking-normal">{reference.length}/8000</span>
                  </div>
                  <textarea
                    value={reference}
                    onChange={(e) => setReference(e.target.value.slice(0, 8000))}
                    placeholder="Paste product features, aesthetic guidelines, target audience specifics, or pricing here. Be as detailed as you like."
                    rows={5}
                    className="w-full resize-none bg-transparent text-sm font-light leading-relaxed text-cream placeholder:text-dim/30 focus:outline-none"
                  />
                </div>

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="group cursor-pointer rounded-2xl border border-dashed border-white/20 bg-white/[0.01] p-8 text-center transition-all duration-300 hover:border-accent hover:bg-accent/[0.02]"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="size-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/10 group-hover:scale-110 transition-all duration-500">
                    <UploadCloud className="size-5 text-dim group-hover:text-accent transition-colors" />
                  </div>
                  <p className="text-sm font-medium text-cream mb-1">
                    Upload moodboards or brand decks
                  </p>
                  <p className="text-[11px] text-dim font-light">
                    Drag & drop files here or click to browse (PDF, DOCX, TXT, Images)
                  </p>
                </div>

                {files.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {files.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-mist group hover:border-accent/50 transition-colors"
                      >
                        <FileText className="size-3.5 text-accent/70" />
                        <span className="max-w-[180px] truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(idx);
                          }}
                          className="text-dim hover:text-red-400 ml-1 transition-colors"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: The Director's Console */}
          <div className="lg:sticky lg:top-20 space-y-6">
            
            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-2xl shadow-2xl overflow-hidden group">
              {/* Decorative gradient orb */}
              <div className="absolute -top-24 -right-24 size-64 rounded-full bg-accent/10 blur-3xl opacity-50 group-hover:bg-accent/20 transition-colors duration-700" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                  <div className="flex items-center gap-2.5">
                    <Compass className="size-5 text-accent" />
                    <span className="font-display text-lg text-cream">Live Overview</span>
                  </div>
                  <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Synced
                  </span>
                </div>

                <div className="space-y-8">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-dim block mb-2">
                      Selected Persona
                    </span>
                    <p className="font-display text-3xl text-cream leading-tight mb-2">
                      {brandName.trim() ? (
                        <>
                          <span className="text-accent">{brandName.trim()}</span>
                          <br />
                          <span className="text-xl text-mist/60 font-sans tracking-tight">as {activeProfile.label}</span>
                        </>
                      ) : (
                        activeProfile.label
                      )}
                    </p>
                    <p className="text-sm text-mist/80 font-light italic">
                      "{activeProfile.tagline}"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-white/5 p-4 border border-white/5">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-dim block mb-1">
                        Timeline
                      </span>
                      <span className="block font-display text-2xl text-cream mb-1">
                        {DURATIONS[duration].label.split(' ')[0]} {DURATIONS[duration].label.split(' ')[1]}
                      </span>
                      <span className="text-xs text-dim font-light">{DURATIONS[duration].days} Days</span>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4 border border-white/5">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-dim block mb-1">
                        Output
                      </span>
                      <span className="block font-display text-2xl text-accent mb-1">
                        {postCount} Posts
                      </span>
                      <span className="text-xs text-dim font-light">
                        ~{(postCount / (DURATIONS[duration].days / 7)).toFixed(1)} / week
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-dim block mb-3">
                      Narrative Pillars
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeProfile.primaryPillars.map((pillar) => (
                        <span
                          key={pillar}
                          className="text-xs text-mist bg-white/5 border border-white/10 rounded-full px-3 py-1.5 font-light"
                        >
                          {pillar}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-accent/20 bg-accent/5 p-5">
                    <div className="flex items-center gap-2 text-accent text-xs uppercase tracking-widest font-medium mb-3">
                      <ShieldCheck className="size-4" />
                      <span>Atelier Output Includes</span>
                    </div>
                    <ul className="text-sm text-mist/90 space-y-2.5 font-light">
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-0.5">•</span> Premium copy & tailored hashtags
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-0.5">•</span> Art direction & visual guidelines
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-0.5">•</span> Strategic publishing schedule
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-0.5">•</span> Direct Google Calendar sync
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTA Box */}
            <div className="bg-ink/60 border border-white/10 rounded-[2rem] p-6 backdrop-blur-xl">
              {error && (
                <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400 font-light flex items-start gap-3">
                  <X className="size-5 shrink-0 text-red-400 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-accent px-8 py-5 text-sm font-medium uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_40px_rgba(201,169,126,0.3)] hover:shadow-[0_0_60px_rgba(201,169,126,0.4)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <Sparkles className="size-5 relative z-10" />
                <span className="relative z-10">Generate Strategy</span>
                <ArrowRight className="size-5 relative z-10 transition-transform group-hover:translate-x-1" />
              </button>
              
              <p className="text-center text-[10px] text-dim uppercase tracking-widest mt-4">
                Powered by Atelier Engine v2.0
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
