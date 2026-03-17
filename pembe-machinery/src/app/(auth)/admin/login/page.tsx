"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json().catch(() => ({}));

    setLoading(false);

    if (!res.ok) {
      setError(data?.error || "Invalid login credentials");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-[color:var(--border)] bg-white/95 backdrop-blur p-8 shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
      <div className="text-center">
        <img src="/logo.svg" alt="Nakuru Rollermill & Poshomill Center" className="h-12 mx-auto" />

        <h1 className="mt-5 text-2xl font-semibold text-[color:var(--pembe-purple)]">
          Admin Login
        </h1>

        <p className="text-sm text-[color:var(--text-muted)] mt-2">
          Sign in to manage products, videos and content.
        </p>
      </div>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <input
            className={`ui-input w-full ${error ? "border-red-300 focus:border-red-400" : ""}`}
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            className={`ui-input w-full ${error ? "border-red-300 focus:border-red-400" : ""}`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <button
          disabled={loading}
          className="ui-button ui-button-dark w-full"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-center">
        <Link
          href="/"
          className="text-sm font-medium text-[color:var(--pembe-purple)] hover:underline"
        >
          ← Back to Website
        </Link>
      </div>
    </div>
  );
}