import { food } from "./industries/food";
import { jewellery } from "./industries/jewellery";
import { perfume } from "./industries/perfume";
import { realEstate } from "./industries/real-estate";
import type {
  DurationKey,
  GenerateInput,
  GeneratedPost,
  IndustryDef,
  IndustryKey,
  PillarKey,
} from "./types";

export const INDUSTRIES: Record<IndustryKey, IndustryDef> = {
  "real-estate": realEstate,
  jewellery,
  perfume,
  food,
};

export const DURATIONS: Record<DurationKey, { label: string; days: number }> = {
  "1w": { label: "1 Week", days: 7 },
  "2w": { label: "2 Weeks", days: 14 },
  "1m": { label: "1 Month", days: 30 },
};

/* ------------------------------------------------------------------ */
/* RNG                                                                 */
/* ------------------------------------------------------------------ */

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickWith<T>(rng: () => number, arr: T[], used: Set<number>): T {
  const free = arr.map((_, i) => i).filter((i) => !used.has(i));
  const pool = free.length > 0 ? free : arr.map((_, i) => i);
  if (free.length === 0) used.clear();
  const idx = pool[Math.floor(rng() * pool.length)];
  used.add(idx);
  return arr[idx];
}

function pickN<T>(rng: () => number, arr: T[], n: number): T[] {
  const idxs = arr.map((_, i) => i);
  for (let i = idxs.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
  }
  return idxs.slice(0, Math.min(n, arr.length)).map((i) => arr[i]);
}

/* ------------------------------------------------------------------ */
/* Pillar rotation — strategic mix, never the same pillar back-to-back */
/* ------------------------------------------------------------------ */

const ROTATIONS: Record<number, PillarKey[]> = {
  3: ["spotlight", "lifestyle", "engagement"],
  6: ["spotlight", "educational", "lifestyle", "occasion", "value", "engagement"],
  12: [
    "spotlight", "craft", "lifestyle", "educational", "occasion", "sensory",
    "value", "engagement", "spotlight", "educational", "lifestyle", "engagement",
  ],
};

export function rotationFor(count: number): PillarKey[] {
  if (ROTATIONS[count]) return ROTATIONS[count];
  // Fallback for any other count: cycle the 12-rotation without adjacency dupes.
  const base = ROTATIONS[12];
  const out: PillarKey[] = [];
  for (let i = 0; i < count; i++) {
    const next = base[i % base.length];
    out.push(out[out.length - 1] === next ? base[(i + 1) % base.length] : next);
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Reference material → factual nuggets                                */
/* ------------------------------------------------------------------ */

const ANCHOR_FRAMES = [
  "Worth knowing —",
  "One detail people remember:",
  "The detail buyers circle back to:",
  "Straight from the fact sheet:",
  "The part everyone screenshots:",
];

function trimNugget(s: string): string {
  let out = s
    .replace(/^[\-–—•·*▪►\s]+/, "") // bullet characters only
    .replace(/^\d{1,2}[.)]\s+/, "") // numbered-list prefix like "1. " or "2) "
    .trim();
  if (out.length > 170) {
    const cut = out.slice(0, 170);
    out = cut.slice(0, cut.lastIndexOf(" ")) + "…";
  }
  return out.replace(/[.,;\s]+$/, "").trim();
}

export function extractNuggets(
  reference: string | undefined,
  keywords: string[],
): string[] {
  if (!reference || reference.trim().length < 12) return [];
  const cleaned = reference.replace(/\s+/g, " ").trim();
  const sentences = cleaned
    .split(/(?<=[.!?;•])\s+|\s[-–—|]\s/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 14 && s.length <= 240);

  const scored = sentences.map((s) => {
    const low = s.toLowerCase();
    let score = 0;
    for (const k of keywords) if (low.includes(k)) score += 2;
    if (/\d/.test(s)) score += 2;
    if (/[₹$€£%]/.test(s)) score += 2;
    score += Math.min(3, (s.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+\b/g) || []).length);
    return { s, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((x) => trimNugget(x.s))
    .filter((s) => s.length > 8);
}

function hashtagify(name: string): string {
  const cleaned = name
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join("");
  return cleaned ? `#${cleaned}` : "";
}

/* ------------------------------------------------------------------ */
/* Scheduling                                                          */
/* ------------------------------------------------------------------ */

function nextMonday(from: Date): Date {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const day = d.getDay(); // 0 Sun … 6 Sat
  const add = ((8 - day) % 7) || 7;
  d.setDate(d.getDate() + add);
  return d;
}

const DAY_FMT = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

export function scheduleDates(
  count: number,
  spanDays: number,
): { iso: string; label: string }[] {
  const start = nextMonday(new Date());
  const out: { iso: string; label: string }[] = [];
  for (let i = 0; i < count; i++) {
    let offset =
      count === 1 ? 0 : Math.round((i * (spanDays - 1)) / (count - 1));
    // Nudge Sundays to Saturday (better engagement for most industries).
    let date = new Date(start);
    date.setDate(start.getDate() + offset);
    if (date.getDay() === 0 && offset > 0) {
      offset -= 1;
      date = new Date(start);
      date.setDate(start.getDate() + offset);
    }
    out.push({ iso: date.toISOString(), label: DAY_FMT.format(date) });
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Caption composer                                                    */
/* ------------------------------------------------------------------ */

const MIN_WORDS = 80;

function wordCount(s: string): number {
  return s.split(/\s+/).filter(Boolean).length;
}



/* ------------------------------------------------------------------ */
/* Export formatting (client-safe)                                     */
/* ------------------------------------------------------------------ */

export interface PlanMeta {
  industryLabel: string;
  durationLabel: string;
  postCount: number;
  brandName?: string | null;
  createdLabel: string;
}

export function planToMarkdown(
  meta: PlanMeta,
  posts: { position: number; dayLabel: string; timeLabel: string; pillar: string; caption: string; visualDirection: string; hashtags: string[] }[],
): string {
  const title = `${meta.brandName ? meta.brandName + " — " : ""}${meta.industryLabel} Content Plan`;
  const lines: string[] = [
    `# ${title}`,
    ``,
    `${meta.postCount} posts · ${meta.durationLabel} · Prepared by Social Atelier · ${meta.createdLabel}`,
    ``,
  ];
  for (const p of posts) {
    lines.push(`---`);
    lines.push(``);
    lines.push(`## Post ${p.position} — ${p.dayLabel} · ${p.timeLabel}`);
    lines.push(``);
    lines.push(`**Content pillar:** ${p.pillar}`);
    lines.push(``);
    lines.push(`**Caption:**`);
    lines.push(``);
    lines.push(p.caption);
    lines.push(``);
    lines.push(`**Visual Direction:**`);
    lines.push(``);
    lines.push(p.visualDirection);
    lines.push(``);
    lines.push(`**Hashtags:**`);
    lines.push(``);
    lines.push(p.hashtags.join(" "));
    lines.push(``);
  }
  return lines.join("\n");
}
