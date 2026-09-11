import { ArrowUpRight, Feather } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader({ anchorPrefix = "" }: { anchorPrefix?: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-full border border-line bg-white/[0.03] text-accent transition-colors group-hover:border-accent">
            <Feather className="size-4" strokeWidth={1.5} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[17px] font-medium tracking-wide">
              Social Atelier
            </span>
            <span className="mt-1 text-[9px] uppercase tracking-[0.32em] text-dim">
              Content Studio
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.22em] text-mist md:flex">
          <Link href={`${anchorPrefix}#method`} className="transition-colors hover:text-cream">
            The Method
          </Link>
          <Link href={`${anchorPrefix}#industries`} className="transition-colors hover:text-cream">
            Industries
          </Link>
          <Link href={`${anchorPrefix}#briefs`} className="transition-colors hover:text-cream">
            Recent Briefs
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-cream transition-all hover:border-accent hover:bg-accent hover:text-ink"
          >
            Dashboard
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-12 sm:flex-row sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex size-7 items-center justify-center rounded-full border border-line text-accent">
            <Feather className="size-3.5" strokeWidth={1.5} />
          </span>
          <span className="font-display text-sm tracking-wide">Social Atelier</span>
        </div>
        <p className="text-center text-[11px] uppercase tracking-[0.24em] text-dim">
          Written for humans. Art-directed by an engine.
        </p>
        <p className="text-[11px] uppercase tracking-[0.24em] text-dim">
          MMXXVI
        </p>
      </div>
    </footer>
  );
}
