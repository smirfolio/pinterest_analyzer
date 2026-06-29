"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";

function SignInForm() {
  const router = useRouter();
  const search = useSearchParams();
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      const next = search.get("callbackUrl") ?? "/analyzer";
      router.replace(next);
    }
  }, [status, router, search]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const res = await signIn("credentials", {
      email,
      redirect: false,
      callbackUrl: search.get("callbackUrl") ?? "/analyzer",
    });
    setSubmitting(false);
    if (!res || res.error) {
      setError(res?.error ?? "Sign-in failed");
      return;
    }
    router.replace(res.url ?? "/analyzer");
  }

  return (
    <div className="mx-auto mt-12 flex max-w-md flex-col items-stretch">
      <div className="card p-8">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Enter any email — this is a POC skeleton with no real password check.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-base mt-1"
              placeholder="[email protected]"
              aria-label="Email"
            />
          </label>
          {error && (
            <p role="alert" className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Powered by NextAuth · credentials provider
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading…</div>}>
      <SignInForm />
    </Suspense>
  );
}