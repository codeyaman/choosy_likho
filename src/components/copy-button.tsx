"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useRef, useState } from "react";

export function CopyButton({
  text,
  label = "Copy",
  copiedLabel = "Copied",
  className = "",
}: {
  text: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onCopy = useCallback(async () => {
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
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }, [text]);

  return (
    <button
      type="button"
      onClick={onCopy}
      className={`group inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-mist transition-all hover:border-accent hover:text-cream ${
        copied ? "border-accent text-accent" : ""
      } ${className}`}
    >
      {copied ? (
        <Check className="size-3" strokeWidth={2.5} />
      ) : (
        <Copy className="size-3 transition-transform group-hover:scale-110" strokeWidth={2} />
      )}
      {copied ? copiedLabel : label}
    </button>
  );
}
