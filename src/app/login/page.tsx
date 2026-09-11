"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { Loader2 } from "lucide-react";
import Link from "next/link";

function LoginContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/dashboard";

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const idToken = await result.user.getIdToken();

      // Create session cookie
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (response.ok) {
        router.push(returnTo);
        router.refresh();
      } else {
        setError("Failed to create session. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4 selection:bg-accent/30">
      <div className="grain absolute inset-0 mix-blend-overlay" />
      
      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="mb-12 flex items-center justify-center">
          <span className="font-display text-[11px] uppercase tracking-[0.4em] text-mist transition-colors hover:text-accent">
            Social Atelier
          </span>
        </Link>
        
        <div className="rounded-3xl border border-line bg-white/[0.015] p-10 text-center shadow-2xl backdrop-blur-xl">
          <h1 className="mb-2 font-display text-4xl font-medium text-cream">
            Welcome back
          </h1>
          <p className="mb-10 text-sm text-dim">
            Sign in to manage your strategies and unlock full plans.
          </p>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-white p-4 text-sm font-medium text-ink transition-all hover:bg-cream disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="size-5 animate-spin text-ink" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.8 15.71 17.58V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.58C14.73 18.24 13.48 18.64 12 18.64C9.14 18.64 6.71 16.71 5.84 14.13H2.15V16.99C3.96 20.59 7.68 23 12 23Z" fill="#34A853"/>
                <path d="M5.84 14.13C5.62 13.47 5.49 12.75 5.49 12C5.49 11.25 5.62 10.53 5.84 9.87V7.01H2.15C1.4 8.5 1 10.2 1 12C1 13.8 1.4 15.5 2.15 17L5.84 14.13Z" fill="#FBBC05"/>
                <path d="M12 5.36C13.62 5.36 15.06 5.92 16.2 7.02L19.36 3.86C17.45 2.08 14.97 1 12 1C7.68 1 3.96 3.41 2.15 7.01L5.84 9.87C6.71 7.29 9.14 5.36 12 5.36Z" fill="#EA4335"/>
              </svg>
            )}
            <span className="relative z-10">
              {loading ? "Signing in..." : "Continue with Google"}
            </span>
          </button>
          
          {error && (
            <p className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-ink px-4"><Loader2 className="size-5 animate-spin text-mist" /></div>}>
      <LoginContent />
    </Suspense>
  );
}
