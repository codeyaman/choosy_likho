"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Trash2,
  RotateCcw,
  Calendar,
  CalendarDays,
  Clock,
  ArrowUpRight,
  ArrowLeft,
  Check,
  Copy,
  Download,
  Search,
  Sparkles,
  ExternalLink,
  Layers,
  Quote,
  Eye,
  X,
  Loader2,
  AlertTriangle,
  User,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { INDUSTRIES, DURATIONS } from "@/lib/engine";
import type { IndustryKey } from "@/lib/engine/types";
import { CreateBriefStudio } from "./create-brief-studio";
import {
  createGoogleCalendarUrl,
  generateIcsCalendar,
  downloadIcsFile,
  type PostCalendarItem,
} from "@/lib/calendar";

export interface SerializedPlan {
  id: string;
  industry: string;
  duration: string;
  postCount: number;
  brandName: string | null;
  reference: string | null;
  userId: string | null;
  createdAt: string; // ISO string
  deletedAt: string | null; // ISO string or null
}

export interface SerializedPost {
  id: string;
  planId: string;
  position: number;
  isoDate: string;
  dayLabel: string;
  timeLabel: string;
  pillar: string;
  category: string;
  caption: string;
  visualDirection: string;
  hashtags: string[];
}

interface Props {
  initialActivePlans: SerializedPlan[];
  initialTrashedPlans: SerializedPlan[];
  initialPostsByPlan: Record<string, SerializedPost[]>;
  userEmail?: string | null;
}

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatSafeDate(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return "";
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return "";
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

export function DashboardClient({
  initialActivePlans,
  initialTrashedPlans,
  initialPostsByPlan,
  userEmail,
}: Props) {
  const [activeTab, setActiveTab] = useState<"briefs" | "create" | "recycle-bin">("briefs");
  const [activePlans, setActivePlans] = useState<SerializedPlan[]>(initialActivePlans);
  const [trashedPlans, setTrashedPlans] = useState<SerializedPlan[]>(initialTrashedPlans);
  const [postsByPlan, setPostsByPlan] = useState<Record<string, SerializedPost[]>>(initialPostsByPlan);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");

  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [previewPlan, setPreviewPlan] = useState<{ plan: SerializedPlan; posts: SerializedPost[] } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // When a brief is created in-dashboard
  const [justCreatedPlan, setJustCreatedPlan] = useState<{
    plan: SerializedPlan;
    posts: SerializedPost[];
  } | null>(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter active plans
  const filteredActivePlans = useMemo(() => {
    return activePlans.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        (p.brandName && p.brandName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.industry.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIndustry = selectedIndustry === "all" || p.industry === selectedIndustry;
      return matchesSearch && matchesIndustry;
    });
  }, [activePlans, searchQuery, selectedIndustry]);

  // Handle plan creation from inside the dashboard
  const handlePlanCreated = async (newPlanId: string) => {
    try {
      const res = await fetch(`/api/plans/${newPlanId}`);
      if (res.ok) {
        const data = await res.json();
        const newPlan: SerializedPlan = {
          ...data.plan,
          createdAt: new Date(data.plan.createdAt).toISOString(),
          deletedAt: data.plan.deletedAt ? new Date(data.plan.deletedAt).toISOString() : null,
        };
        const posts: SerializedPost[] = data.posts || [];

        setActivePlans((prev) => [newPlan, ...prev]);
        setPostsByPlan((prev) => ({ ...prev, [newPlanId]: posts }));
        setJustCreatedPlan({ plan: newPlan, posts });
        showToast("Brief successfully created and bound to your account!");
      }
    } catch {
      showToast("Brief generated! You can find it in your Briefs list.");
      setActiveTab("briefs");
    }
  };

  // Move to Recycle Bin (Trash)
  const handleTrashPlan = async (id: string) => {
    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/plans/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "trash" }),
      });
      if (!res.ok) throw new Error("Failed to move to trash");

      const planToTrash = activePlans.find((p) => p.id === id);
      if (planToTrash) {
        const updated = { ...planToTrash, deletedAt: new Date().toISOString() };
        setActivePlans((prev) => prev.filter((p) => p.id !== id));
        setTrashedPlans((prev) => [updated, ...prev]);
        showToast("Brief moved to Recycle Bin.");
      }
    } catch (e) {
      alert("Error moving brief to trash.");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Restore from Recycle Bin
  const handleRestorePlan = async (id: string) => {
    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/plans/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "restore" }),
      });
      if (!res.ok) throw new Error("Failed to restore");

      const planToRestore = trashedPlans.find((p) => p.id === id);
      if (planToRestore) {
        const updated = { ...planToRestore, deletedAt: null };
        setTrashedPlans((prev) => prev.filter((p) => p.id !== id));
        setActivePlans((prev) => [updated, ...prev]);
        showToast("Brief restored to My Briefs!");
      }
    } catch (e) {
      alert("Error restoring brief.");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Permanently Delete
  const handlePermanentDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this brief? This cannot be undone.")) {
      return;
    }
    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/plans/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete permanently");

      setTrashedPlans((prev) => prev.filter((p) => p.id !== id));
      showToast("Brief permanently deleted.");
    } catch (e) {
      alert("Error deleting brief permanently.");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Empty Entire Recycle Bin
  const handleEmptyBin = async () => {
    if (trashedPlans.length === 0) return;
    if (!confirm(`Are you sure you want to permanently delete all ${trashedPlans.length} briefs in the recycle bin?`)) {
      return;
    }
    setActionLoadingId("empty-all");
    try {
      await Promise.all(
        trashedPlans.map((p) =>
          fetch(`/api/plans/${p.id}`, { method: "DELETE" }).catch(() => null)
        )
      );
      setTrashedPlans([]);
      showToast("Recycle bin emptied.");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Sync / Download .ics
  const handleDownloadCalendar = (plan: SerializedPlan) => {
    const posts = postsByPlan[plan.id] || [];
    if (posts.length === 0) {
      alert("Posts for this plan are loading. Please open the plan to view all posts.");
      return;
    }
    const ind = INDUSTRIES[plan.industry as keyof typeof INDUSTRIES];
    const icsContent = generateIcsCalendar(posts, {
      id: plan.id,
      brandName: plan.brandName,
      industryLabel: ind?.label ?? plan.industry,
    });
    const filename = `${(plan.brandName || ind?.label || "content").toLowerCase().replace(/\s+/g, "-")}-calendar.ics`;
    downloadIcsFile(filename, icsContent);
    showToast("Calendar (.ics) downloaded with notification reminders!");
  };

  return (
    <div className="relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-[100] flex items-center gap-3 rounded-2xl border border-accent/40 bg-ink/95 px-5 py-3.5 text-xs text-cream shadow-2xl backdrop-blur-xl transition-all">
          <Sparkles className="size-4 text-accent" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Dashboard Nav Bar / Tab Controls */}
      <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.34em] text-mist">
            <span className="inline-block size-1.5 rounded-full bg-accent" />
            Social Media Content Strategist
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Strategy <em className="text-accent">Workspace</em>
          </h1>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          {/* 3 Main Tabs */}
          <div className="flex items-center rounded-full border border-line bg-white/[0.02] p-1 text-xs overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => {
              setActiveTab("briefs");
              setJustCreatedPlan(null);
            }}
            className={`group flex items-center gap-2 rounded-full px-5 py-2.5 font-medium transition-all scope-${activePlans[0]?.industry || "real-estate"} ${
              activeTab === "briefs"
                ? "bg-accent text-ink shadow-[0_0_15px_rgba(var(--accent),0.3)]"
                : "text-mist hover:text-cream hover:bg-accent/10"
            }`}
          >
            <Layers className={`size-3.5 transition-colors ${activeTab === "briefs" ? "text-ink" : "group-hover:text-accent"}`} />
            <span>My Briefs</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] transition-colors ${
                activeTab === "briefs" ? "bg-ink/20 text-ink" : "bg-white/10 text-cream group-hover:bg-accent/20 group-hover:text-accent"
              }`}
            >
              {activePlans.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("create")}
            className={`group flex items-center gap-2 rounded-full px-5 py-2.5 font-medium transition-all scope-${activePlans[0]?.industry || "real-estate"} ${
              activeTab === "create"
                ? "bg-accent text-ink shadow-[0_0_15px_rgba(var(--accent),0.3)]"
                : "text-mist hover:text-cream hover:bg-accent/10"
            }`}
          >
            <Plus className={`size-3.5 transition-colors ${activeTab === "create" ? "text-ink" : "group-hover:text-accent"}`} />
            <span>Create a Brief</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("recycle-bin");
              setJustCreatedPlan(null);
            }}
            className={`group flex items-center gap-2 rounded-full px-5 py-2.5 font-medium transition-all scope-${activePlans[0]?.industry || "real-estate"} ${
              activeTab === "recycle-bin"
                ? "bg-accent text-ink shadow-[0_0_15px_rgba(var(--accent),0.3)]"
                : "text-mist hover:text-cream hover:bg-accent/10"
            }`}
          >
            <Trash2 className={`size-3.5 transition-colors ${activeTab === "recycle-bin" ? "text-ink" : "group-hover:text-accent"}`} />
            <span>Recycle Bin</span>
            {trashedPlans.length > 0 && (
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  activeTab === "recycle-bin" ? "bg-ink/20 text-ink" : "bg-red-500/20 text-red-400"
                }`}
              >
                {trashedPlans.length}
              </span>
            )}
          </button>
          </div>

          <div className="hidden h-8 w-px bg-line sm:block" />

          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`group flex items-center gap-2 rounded-full border border-line bg-transparent px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-cream transition-all scope-${activePlans[0]?.industry || "real-estate"} hover:border-accent hover:bg-accent hover:text-ink hover:shadow-lg`}
              >
                <User className="size-3.5 transition-transform group-hover:scale-110" />
                <span>Profile</span>
              </button>

              {isProfileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-line bg-ink/95 backdrop-blur-xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="border-b border-white/5 px-4 py-3">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-dim font-medium mb-1">Signed in as</p>
                      <p className="text-sm text-cream truncate font-medium">{userEmail}</p>
                    </div>
                    <div className="p-1">
                      <Link href="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-mist hover:bg-white/5 hover:text-cream transition-colors">
                        <UserCircle className="size-4" /> Account Settings
                      </Link>
                      <Link href="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-mist hover:bg-white/5 hover:text-cream transition-colors">
                        <Settings className="size-4" /> Workspace Preferences
                      </Link>
                    </div>
                    <div className="border-t border-white/5 p-1">
                      <form action="/api/auth/logout" method="POST">
                        <button type="submit" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400 hover:bg-red-400/10 transition-colors text-left font-medium">
                          <LogOut className="size-4" /> Sign out
                        </button>
                      </form>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>      {/* ------------------------------------------------------------- */}
      {/* TAB 1: MY BRIEFS                                              */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "briefs" && (
        <div className="space-y-8">
          {/* Filters & Search Header */}
          <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white/[0.015] p-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-dim" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by brand or industry…"
                className="w-full rounded-xl border border-line bg-ink/60 py-2 pl-10 pr-4 text-xs text-cream placeholder:text-dim focus:border-accent focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dim hover:text-cream"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Industry Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setSelectedIndustry("all")}
                className={`rounded-full px-3 py-1.5 text-[11px] transition-all ${
                  selectedIndustry === "all"
                    ? "bg-white/15 text-cream border border-white/30"
                    : "text-dim hover:text-cream"
                }`}
              >
                All Industries
              </button>
              {Object.entries(INDUSTRIES).map(([key, ind]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedIndustry(key)}
                  className={`rounded-full px-3 py-1.5 text-[11px] transition-all border scope-${key} ${
                    selectedIndustry === key
                      ? "bg-accent text-ink border-transparent shadow-md"
                      : "border-transparent text-dim hover:text-accent hover:bg-white/5"
                  }`}
                >
                  {ind.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Plans Grid */}
          {filteredActivePlans.length === 0 ? (
            <div className="w-full rounded-3xl border border-dashed border-line p-16 text-center">
              <Quote className="mx-auto mb-4 size-8 text-dim" strokeWidth={1} />
              <h3 className="font-display text-xl font-medium text-cream">
                {searchQuery || selectedIndustry !== "all"
                  ? "No matching briefs found"
                  : "You haven't commissioned any briefs yet"}
              </h3>
              <p className="mt-2 text-sm text-dim">
                {searchQuery || selectedIndustry !== "all"
                  ? "Try resetting your search query or filter."
                  : "Generate your first tailored content calendar with captions, visual directions, and Google Calendar sync."}
              </p>
              <button
                type="button"
                onClick={() => setActiveTab("create")}
                className={`mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-all scope-${activePlans[0]?.industry || "real-estate"} bg-accent text-ink hover:scale-[1.03] shadow-lg hover:shadow-xl`}
              >
                <Plus className="size-3.5" />
                Create Brief Now
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredActivePlans.map((p) => {
                const ind = INDUSTRIES[p.industry as keyof typeof INDUSTRIES];
                const posts = postsByPlan[p.id] || [];
                const isWorking = actionLoadingId === p.id;

                return (
                  <div
                    key={p.id}
                    className={`group scope-${p.industry} relative flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-white/[0.015] p-6 transition-all hover:border-[var(--accent)] hover:bg-white/[0.03]`}
                  >
                    <div className="accent-glow pointer-events-none absolute -right-12 -top-12 size-44 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-dim">
                        <span className="text-accent font-medium">{ind?.label ?? p.industry}</span>
                        <span suppressHydrationWarning>{formatSafeDate(p.createdAt)}</span>
                      </div>

                      {/* Brand Title */}
                      <h3 className="mt-4 font-display text-2xl font-medium leading-snug text-cream">
                        {p.brandName ? p.brandName : "Untitled Studio Plan"}
                      </h3>

                      {/* Chips */}
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-mist">
                        <span className="rounded-full border border-line px-2.5 py-1 text-[10px] tracking-wide">
                          {p.postCount} posts
                        </span>
                        <span className="rounded-full border border-line px-2.5 py-1 text-[10px] tracking-wide">
                          {DURATIONS[p.duration as keyof typeof DURATIONS]?.label ?? p.duration}
                        </span>
                        {posts.length > 0 && (
                          <span className="rounded-full bg-accent/10 border border-accent/30 text-accent px-2.5 py-1 text-[10px] tracking-wide">
                            {posts.length} scheduled
                          </span>
                        )}
                      </div>

                      {/* Snippet / Pillars preview */}
                      {posts.length > 0 && (
                        <div className="mt-5 border-t border-line/60 pt-4">
                          <p className="text-[10px] uppercase tracking-[0.22em] text-dim mb-2">
                            Pillars
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {Array.from(new Set(posts.map((post) => post.pillar)))
                              .slice(0, 3)
                              .map((pillar) => (
                                <span
                                  key={pillar}
                                  className="rounded-full bg-white/[0.03] px-2 py-0.5 text-[10px] text-mist"
                                >
                                  {pillar}
                                </span>
                              ))}
                            {new Set(posts.map((post) => post.pillar)).size > 3 && (
                              <span className="text-[10px] text-dim self-center">
                                +{new Set(posts.map((post) => post.pillar)).size - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Actions Footer */}
                    <div className="mt-8 border-t border-line pt-4">
                      <div className="flex items-center justify-between gap-2">
                        {/* Open Plan */}
                        <Link
                          href={`/plan/${p.id}`}
                          className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:text-accent"
                        >
                          <span>Open Plan</span>
                          <ArrowUpRight className="size-3.5" />
                        </Link>

                        <div className="flex items-center gap-1.5">
                          {/* Calendar Sync Button */}
                          <button
                            type="button"
                            onClick={() => handleDownloadCalendar(p)}
                            title="Sync entire plan with Google Calendar (.ics)"
                            className="flex size-8 items-center justify-center rounded-full border border-line bg-white/[0.03] text-mist transition-colors hover:border-accent hover:text-accent"
                          >
                            <Calendar className="size-3.5" />
                          </button>

                          {/* Quick Preview Modal */}
                          {posts.length > 0 && (
                            <button
                              type="button"
                              onClick={() => setPreviewPlan({ plan: p, posts })}
                              title="Quick post preview"
                              className="flex size-8 items-center justify-center rounded-full border border-line bg-white/[0.03] text-mist transition-colors hover:border-cream hover:text-cream"
                            >
                              <Eye className="size-3.5" />
                            </button>
                          )}

                          {/* Move to Bin */}
                          <button
                            type="button"
                            disabled={isWorking}
                            onClick={() => handleTrashPlan(p.id)}
                            title="Move to Recycle Bin"
                            className="flex size-8 items-center justify-center rounded-full border border-line bg-white/[0.03] text-dim transition-colors hover:border-red-500/50 hover:text-red-400 disabled:opacity-50"
                          >
                            {isWorking ? (
                              <Loader2 className="size-3.5 animate-spin text-dim" />
                            ) : (
                              <Trash2 className="size-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: CREATE A BRIEF (IN-DASHBOARD STUDIO)                   */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "create" && (
        <div>
          {justCreatedPlan ? (
            /* Result Screen inside Dashboard */
            <div className={`scope-${justCreatedPlan.plan.industry} space-y-8`}>
              <div className="rounded-3xl border border-accent/40 bg-white/[0.02] p-8 backdrop-blur-xl">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-accent">
                      <Sparkles className="size-3.5" />
                      Plan Successfully Bound
                    </span>
                    <h2 className="mt-2 font-display text-3xl font-medium text-cream sm:text-4xl">
                      {justCreatedPlan.plan.brandName
                        ? justCreatedPlan.plan.brandName
                        : "Your Content Plan"}{" "}
                      is ready
                    </h2>
                    <p className="mt-1 text-xs text-mist">
                      {justCreatedPlan.posts.length} posts generated across{" "}
                      {DURATIONS[justCreatedPlan.plan.duration as keyof typeof DURATIONS]?.label}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Sync with Google Calendar */}
                    <button
                      type="button"
                      onClick={() => handleDownloadCalendar(justCreatedPlan.plan)}
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink transition-transform hover:scale-[1.03]"
                    >
                      <Calendar className="size-4" />
                      <span>Sync to Google Calendar</span>
                    </button>

                    {/* View in My Briefs */}
                    <button
                      type="button"
                      onClick={() => {
                        setJustCreatedPlan(null);
                        setActiveTab("briefs");
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-cream transition-colors hover:border-accent hover:text-accent"
                    >
                      <span>View in My Briefs</span>
                      <ArrowRight className="size-3.5" />
                    </button>

                    {/* Open full page */}
                    <Link
                      href={`/plan/${justCreatedPlan.plan.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-cream transition-colors hover:border-white hover:text-white"
                    >
                      <span>Full Page View</span>
                      <ExternalLink className="size-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Posts Timeline Preview */}
                <div className="mt-10 space-y-4">
                  <h3 className="text-xs uppercase tracking-[0.24em] text-dim">
                    Generated Editorial Posts
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {justCreatedPlan.posts.map((post) => {
                      const gcalUrl = createGoogleCalendarUrl(post, {
                        brandName: justCreatedPlan.plan.brandName,
                        industryLabel:
                          INDUSTRIES[justCreatedPlan.plan.industry as keyof typeof INDUSTRIES]?.label,
                      });

                      return (
                        <div
                          key={post.position}
                          className="rounded-2xl border border-line bg-ink/70 p-6 backdrop-blur-md"
                        >
                          <div className="flex items-center justify-between border-b border-line/60 pb-3 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-display italic text-accent">
                                #{String(post.position).padStart(2, "0")}
                              </span>
                              <span className="font-medium text-cream">{post.pillar}</span>
                            </div>
                            <div className="flex items-center gap-2 text-dim text-[11px]">
                              <CalendarDays className="size-3 text-accent" />
                              <span>{post.dayLabel} · {post.timeLabel}</span>
                            </div>
                          </div>

                          <p className="mt-3 text-xs leading-relaxed text-mist line-clamp-3">
                            {post.caption}
                          </p>

                          <div className="mt-4 flex items-center justify-between border-t border-line/40 pt-3">
                            <div className="flex flex-wrap gap-1">
                              {post.hashtags.slice(0, 3).map((h) => (
                                <span key={h} className="text-[10px] text-dim">
                                  {h}
                                </span>
                              ))}
                            </div>

                            {/* Direct Google Calendar Add */}
                            <a
                              href={gcalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-wider text-accent transition-colors hover:border-accent"
                            >
                              <Calendar className="size-3" />
                              <span>Add to GCal</span>
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-line text-center">
                  <button
                    type="button"
                    onClick={() => setJustCreatedPlan(null)}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-dim hover:text-cream"
                  >
                    <RotateCcw className="size-3.5" />
                    <span>Create another brief</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* In-Dashboard Atelier Creator Suite */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-line pb-6">
                <div>
                  <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-accent font-medium">
                    <Sparkles className="size-3.5" />
                    Atelier Creator Suite · Commission Studio
                  </span>
                  <h2 className="mt-1 font-display text-2xl sm:text-3xl font-medium text-cream">
                    Craft Your Next Campaign Blueprint
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("briefs")}
                  className="self-start sm:self-auto inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-dim hover:border-cream hover:text-cream transition-colors"
                >
                  <ArrowLeft className="size-3.5" />
                  <span>Return to Briefs</span>
                </button>
              </div>

              <div className="rounded-3xl border border-line bg-white/[0.015] p-6 sm:p-10 backdrop-blur-xl">
                <CreateBriefStudio
                  onPlanCreated={handlePlanCreated}
                  onCancel={() => setActiveTab("briefs")}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: RECYCLE BIN                                            */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "recycle-bin" && (
        <div className="space-y-8">
          <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white/[0.015] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-medium text-cream">
                Recycle Bin
              </h2>
              <p className="mt-1 text-xs text-dim">
                Briefs in the recycle bin can be restored back to your active briefs or permanently deleted.
              </p>
            </div>

            {trashedPlans.length > 0 && (
              <button
                type="button"
                disabled={actionLoadingId === "empty-all"}
                onClick={handleEmptyBin}
                className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-4 py-2 text-xs uppercase tracking-wider text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-50"
              >
                {actionLoadingId === "empty-all" ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Trash2 className="size-3.5" />
                )}
                <span>Empty Recycle Bin</span>
              </button>
            )}
          </div>

          {trashedPlans.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-line p-16 text-center">
              <Trash2 className="mx-auto mb-4 size-8 text-dim" strokeWidth={1} />
              <h3 className="font-display text-xl font-medium text-cream">
                Recycle Bin is empty
              </h3>
              <p className="mt-2 text-sm text-dim">
                No deleted briefs. Active briefs can be trashed at any time from My Briefs.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trashedPlans.map((p) => {
                const ind = INDUSTRIES[p.industry as keyof typeof INDUSTRIES];
                const isWorking = actionLoadingId === p.id;

                return (
                  <div
                    key={p.id}
                    className="relative flex flex-col justify-between rounded-3xl border border-red-500/20 bg-red-500/[0.02] p-6"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-dim">
                        <span className="text-red-400 font-medium">
                          {ind?.label ?? p.industry}
                        </span>
                        <span suppressHydrationWarning>
                          Deleted {p.deletedAt ? formatSafeDate(p.deletedAt) : "Recently"}
                        </span>
                      </div>

                      <h3 className="mt-4 font-display text-2xl font-medium text-cream">
                        {p.brandName ? p.brandName : "Untitled Studio Plan"}
                      </h3>

                      <p className="mt-1 text-xs text-dim">
                        {p.postCount} posts · {DURATIONS[p.duration as keyof typeof DURATIONS]?.label}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center justify-between gap-3 border-t border-line/60 pt-4">
                      {/* Restore */}
                      <button
                        type="button"
                        disabled={isWorking}
                        onClick={() => handleRestorePlan(p.id)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-xs text-cream transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
                      >
                        {isWorking ? (
                          <Loader2 className="size-3 animate-spin" />
                        ) : (
                          <RotateCcw className="size-3" />
                        )}
                        <span>Restore</span>
                      </button>

                      {/* Delete permanently */}
                      <button
                        type="button"
                        disabled={isWorking}
                        onClick={() => handlePermanentDelete(p.id)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1.5 text-xs text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-50"
                      >
                        <Trash2 className="size-3" />
                        <span>Delete Permanently</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* QUICK PREVIEW MODAL                                           */}
      {/* ------------------------------------------------------------- */}
      {previewPlan && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-line bg-ink p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.24em] text-accent">
                  {INDUSTRIES[previewPlan.plan.industry as keyof typeof INDUSTRIES]?.label}
                </span>
                <h3 className="font-display text-2xl font-medium text-cream">
                  {previewPlan.plan.brandName || "Content Strategy Preview"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewPlan(null)}
                className="rounded-full border border-line p-2 text-dim hover:text-cream"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {previewPlan.posts.map((post) => (
                <div key={post.position} className="rounded-2xl border border-line bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between text-xs text-dim">
                    <span className="font-display text-accent">Post #{post.position}</span>
                    <span>{post.dayLabel} at {post.timeLabel}</span>
                  </div>
                  <h4 className="mt-2 font-display text-lg text-cream">{post.pillar}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-mist">{post.caption}</p>
                  <p className="mt-3 text-[11px] italic text-dim">Visual: {post.visualDirection}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-line">
              <button
                type="button"
                onClick={() => handleDownloadCalendar(previewPlan.plan)}
                className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs text-accent hover:bg-accent hover:text-ink"
              >
                <Calendar className="size-3.5" />
                <span>Sync to Google Calendar</span>
              </button>
              <Link
                href={`/plan/${previewPlan.plan.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-xs font-medium text-ink hover:bg-white"
              >
                <span>Open Full Page</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ArrowRight(props: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
