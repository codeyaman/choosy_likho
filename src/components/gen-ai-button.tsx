"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, ChevronDown, Check, ExternalLink, Plus, X } from "lucide-react";

type Platform = {
  id: string;
  name: string;
  url: string;
};

const DEFAULT_PLATFORMS: Platform[] = [
  { id: "chatgpt", name: "ChatGPT", url: "https://chatgpt.com/?q=" },
  { id: "gemini", name: "Gemini", url: "https://gemini.google.com/app" },
];

export function GenAiButton({ visualDirection }: { visualDirection: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [customPlatforms, setCustomPlatforms] = useState<Platform[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load custom platforms from local storage
    const stored = localStorage.getItem("genAiCustomPlatforms");
    if (stored) {
      try {
        setCustomPlatforms(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse custom platforms", e);
      }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsAdding(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = async (platform: Platform) => {
    const prompt = `Create image ${visualDirection}`;
    
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedId(platform.id);
      setTimeout(() => setCopiedId(null), 2000);
      
      let targetUrl = platform.url;
      if (platform.url.endsWith("?q=") || platform.url.endsWith("?text=")) {
        targetUrl += encodeURIComponent(prompt);
      }
      
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
    setIsOpen(false);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newUrl.trim()) return;

    let finalUrl = newUrl.trim();
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = 'https://' + finalUrl;
    }

    const newPlatform: Platform = {
      id: `custom-${Date.now()}`,
      name: newName.trim(),
      url: finalUrl,
    };

    const updated = [...customPlatforms, newPlatform];
    setCustomPlatforms(updated);
    localStorage.setItem("genAiCustomPlatforms", JSON.stringify(updated));
    
    setNewName("");
    setNewUrl("");
    setIsAdding(false);
  };

  const allPlatforms = [...DEFAULT_PLATFORMS, ...customPlatforms];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-[11px] tracking-wider text-accent transition-colors hover:border-accent"
      >
        <Sparkles className="size-3.5" />
        <span>Use GenAI</span>
        <ChevronDown className="size-3" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-10 mt-2 w-56 max-h-[60vh] overflow-y-auto rounded-xl border border-line bg-panel/95 shadow-xl backdrop-blur-md">
          {!isAdding ? (
            <div className="p-1.5">
              {allPlatforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => handleAction(platform)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[12px] text-mist transition-colors hover:bg-white/[0.04] hover:text-cream"
                >
                  <span className="truncate">{platform.name}</span>
                  {copiedId === platform.id ? (
                    <Check className="size-3.5 shrink-0 text-accent" />
                  ) : (
                    <ExternalLink className="size-3.5 shrink-0 opacity-50" />
                  )}
                </button>
              ))}
              
              <div className="mx-2 my-1 h-px bg-line" />
              
              <button
                onClick={() => setIsAdding(true)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[12px] text-accent transition-colors hover:bg-white/[0.04]"
              >
                <Plus className="size-3.5" />
                <span>Add more AI</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleAddCustom} className="p-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-wider text-mist">Add custom AI</span>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="rounded-full p-1 text-dim transition-colors hover:bg-white/5 hover:text-cream"
                >
                  <X className="size-3.5" />
                </button>
              </div>
              
              <div className="space-y-2.5">
                <div>
                  <label className="mb-1 block text-[10px] text-dim">Name (e.g. Claude)</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="AI Platform Name"
                    className="w-full rounded-md border border-line bg-ink px-2.5 py-1.5 text-xs text-cream outline-none transition-colors focus:border-accent"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[10px] text-dim">URL</label>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-md border border-line bg-ink px-2.5 py-1.5 text-xs text-cream outline-none transition-colors focus:border-accent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-1 w-full rounded-md bg-accent px-3 py-1.5 text-[11px] font-medium tracking-wide text-ink transition-colors hover:bg-cream"
                >
                  Save AI
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
