export type IndustryKey = "real-estate" | "jewellery" | "perfume" | "food";
export type DurationKey = "1w" | "2w" | "1m";

export type PillarKey =
  | "spotlight"
  | "craft"
  | "educational"
  | "lifestyle"
  | "occasion"
  | "engagement"
  | "value"
  | "sensory";

export interface PillarDef {
  key: PillarKey;
  /** Editorial label shown on the card, e.g. "Project Spotlight" */
  label: string;
  /** Strategy category chip, e.g. "Product" | "Emotional" */
  category: string;
  /** Suggested posting time */
  time: string;
  hooks: string[];
  bodies: string[][];
  closers: string[];
  support: string[];
  visuals: string[];
  tags: string[];
}

export interface IndustryDef {
  key: IndustryKey;
  label: string;
  shortLabel: string;
  audience: string;
  voice: string;
  description: string;
  keywords: string[];
  broadTags: string[];
  nicheTags: string[];
  pillars: Record<PillarKey, PillarDef>;
}

export interface GeneratedPost {
  position: number;
  isoDate: string;
  dayLabel: string;
  timeLabel: string;
  pillar: string;
  category: string;
  pillarKey: PillarKey;
  caption: string;
  visualDirection: string;
  hashtags: string[];
}

export interface GenerateInput {
  industry: IndustryKey;
  duration: DurationKey;
  postCount: number;
  brandName?: string;
  reference?: string;
  seed: number;
  files?: File[];
}
