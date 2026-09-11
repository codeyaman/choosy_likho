"use client";

import { Check, Copy, Download, PenLine, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { planToMarkdown, type PlanMeta } from "@/lib/engine";

interface SerializablePost {
  position: number;
  dayLabel: string;
  timeLabel: string;
  pillar: string;
  caption: string;
  visualDirection: string;
  hashtags: string[];
}

interface Props {
  meta: PlanMeta;
  posts: SerializablePost[];
  regenerate: {
    industry: string;
    duration: string;
    postCount: number;
    brandName: string | null;
    reference: string | null;
  };
}

export function PlanActions({ meta, posts, regenerate }: Props) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [working, setWorking] = useState(false);

  const markdown = useCallback(() => planToMarkdown(meta, posts), [meta, posts]);

  async function copyAll() {
    const text = markdown();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  function download() {
    const blob = new Blob([markdown()], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const slug = (meta.brandName ?? meta.industryLabel)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    a.href = url;
    a.download = `${slug}-content-plan.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function regen() {
    setWorking(true);
    try {
      const res = await fetch("/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regenerate),
      });
      const data = (await res.json()) as { id?: string };
      if (data.id) router.push(`/plan/${data.id}`);
      else setWorking(false);
    } catch {
      setWorking(false);
    }
  }

  return (
    <div className="flex flex-col gap-2.5">
      <button
        type="button"
        onClick={copyAll}
        className={`group inline-flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 text-[11px] uppercase tracking-[0.2em] transition-all ${
          copied
            ? "border-accent text-accent"
            : "border-line text-cream hover:border-accent"
        }`}
      >
        <span>{copied ? "Copied to clipboard" : "Copy full plan"}</span>
        {copied ? <Check className="size-4" /> : <Copy className="size-4" strokeWidth={1.5} />}
      </button>
      <button
        type="button"
        onClick={download}
        className="group inline-flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-line px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-cream transition-all hover:border-accent"
      >
        <span>Download .md</span>
        <Download className="size-4" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        onClick={regen}
        disabled={working}
        className="group inline-flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-line px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-cream transition-all hover:border-accent disabled:opacity-50"
      >
        <span>{working ? "Rewriting…" : "Regenerate"}</span>
        <RotateCcw className={`size-4 ${working ? "animate-spin" : ""}`} strokeWidth={1.5} />
      </button>
      <Link
        href="/#brief"
        className="group inline-flex items-center justify-between gap-3 rounded-xl bg-accent px-4 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink transition-transform hover:scale-[1.02]"
      >
        <span>New brief</span>
        <PenLine className="size-4" strokeWidth={1.8} />
      </Link>
    </div>
  );
}


