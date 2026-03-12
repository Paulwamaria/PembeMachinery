"use client";

import { useEffect, useState } from "react";
import { slugify } from "@/lib/slug";

type Category = {
  id: string;
  name: string;
  slug: string;
};

export default function AdminCategoriesPage() {
  const [items, setItems] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    setItems(data.results ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!slug && name) {
      setSlug(slugify(name));
    }
  }, [name, slug]);

  async function createCategory(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        slug: slugify(slug || name),
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Failed to create category");
      return;
    }

    setName("");
    setSlug("");
    load();
  }

  return (
    <main className="max-w-5xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
            Admin
          </p>
          <h1 className="text-3xl font-semibold tracking-tight mt-1 text-[color:var(--pembe-purple)]">
            Categories
          </h1>
          <p className="text-sm text-[color:var(--text-muted)] mt-2">
            Organize products into clean, searchable catalogue groups.
          </p>
        </div>
      </div>

      <section className="mt-8 grid lg:grid-cols-[1.1fr_1.4fr] gap-6">
        <div className="soft-card p-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-[rgba(91,44,163,0.10)] flex items-center justify-center text-[color:var(--pembe-purple)] font-semibold">
              +
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Add Category
              </h2>
              <p className="text-sm text-[color:var(--text-muted)] mt-1">
                Create a new catalogue category for machinery items.
              </p>
            </div>
          </div>

          <form onSubmit={createCategory} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900">
                Category Name
              </label>
              <input
                className="ui-input"
                placeholder="e.g. Rice Hullers"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900">
                Slug
              </label>
              <input
                className="ui-input"
                placeholder="e.g. rice-hullers"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>

            <button
              disabled={loading}
              className="ui-button ui-button-dark w-full"
            >
              {loading ? "Creating..." : "Create Category"}
            </button>
          </form>
        </div>

        <div className="soft-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Existing Categories
              </h2>
              <p className="text-sm text-[color:var(--text-muted)] mt-1">
                Categories currently available in the public catalogue.
              </p>
            </div>

            <div className="brand-badge brand-badge-purple">
              {items.length} total
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[color:var(--border)] bg-white p-8 text-center">
                <h3 className="font-semibold text-slate-900">
                  No categories yet
                </h3>
                <p className="text-sm text-[color:var(--text-muted)] mt-2">
                  Create your first category to start organizing products.
                </p>
              </div>
            ) : (
              items.map((item, index) => {
                const accents = [
                  "var(--pembe-purple)",
                  "var(--pembe-green)",
                  "var(--pembe-magenta)",
                ];
                const accent = accents[index % accents.length];

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-[color:var(--border)] bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div
                          className="mt-1 h-10 w-10 rounded-2xl text-white flex items-center justify-center text-sm font-semibold"
                          style={{ background: accent }}
                        >
                          {item.name.slice(0, 2).toUpperCase()}
                        </div>

                        <div>
                          <div className="font-semibold text-slate-900">
                            {item.name}
                          </div>
                          <div className="text-sm text-[color:var(--text-muted)] mt-1">
                            /{item.slug}
                          </div>
                        </div>
                      </div>

                      <span
                        className="brand-badge"
                        style={{
                          background: "rgba(91,44,163,0.06)",
                          color: "var(--pembe-purple)",
                          border: "1px solid rgba(91,44,163,0.14)",
                        }}
                      >
                        Active
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </main>
  );
}