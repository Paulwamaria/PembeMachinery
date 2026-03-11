"use client";

import { useEffect, useMemo, useState } from "react";
import { slugify } from "@/lib/slug";

type Category = { id: string; name: string; slug: string };

export default function AdminCategories() {
  const [items, setItems] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const autoSlug = useMemo(() => slugify(name), [name]);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((d) => setItems(d.results ?? []));
  }, []);

  useEffect(() => {
    if (!slug) setSlug(autoSlug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSlug]);

  async function addCategory(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug: slugify(slug) }),
    });

    setLoading(false);
    if (!res.ok) {
      setErr("Failed to create category (slug must be unique).");
      return;
    }

    const created = await res.json();
    setItems((prev) => [created, ...prev].sort((a, b) => a.name.localeCompare(b.name)));
    setName("");
    setSlug("");
  }

  async function updateCategory(id: string, patch: Partial<Category>) {
    const res = await fetch(`/api/admin/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (!res.ok) return;

    const updated = await res.json();
    setItems((prev) => prev.map((x) => (x.id === id ? updated : x)));
  }

  async function removeCategory(id: string) {
    if (!confirm("Delete this category? (must have no products)")) return;
    const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("Cannot delete category. Remove/Move its products first.");
      return;
    }
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <main className="max-w-5xl">
      <h1 className="text-2xl font-semibold">Manage Categories</h1>

      <form onSubmit={addCategory} className="mt-6 grid md:grid-cols-3 gap-3">
        <input
          className="border rounded-xl px-3 py-2"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border rounded-xl px-3 py-2"
          placeholder="Slug (auto)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <button className="border rounded-xl px-3 py-2" disabled={loading}>
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>

      {err ? <div className="text-sm text-red-600 mt-2">{err}</div> : null}

      <div className="mt-8 space-y-3">
        {items.map((c) => (
          <div key={c.id} className="border rounded-2xl p-4 flex flex-col md:flex-row gap-3 md:items-center">
            <input
              className="border rounded-xl px-3 py-2 flex-1"
              defaultValue={c.name}
              onBlur={(e) => {
                const v = e.target.value.trim();
                if (v && v !== c.name) updateCategory(c.id, { name: v });
              }}
            />
            <input
              className="border rounded-xl px-3 py-2 flex-1"
              defaultValue={c.slug}
              onBlur={(e) => {
                const v = slugify(e.target.value);
                if (v && v !== c.slug) updateCategory(c.id, { slug: v });
              }}
            />
            <button className="border rounded-xl px-3 py-2" onClick={() => removeCategory(c.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}