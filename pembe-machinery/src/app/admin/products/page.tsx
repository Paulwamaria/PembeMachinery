"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  slug: string;
  featured: boolean;
  inStock: boolean;
  price?: string | number | null;
  currency?: string | null;
  priceOnRequest?: boolean;
  category?: { name: string };
};

function formatPrice(price: unknown, currency?: string | null) {
  if (price === null || price === undefined || price === "") return null;
  const value = Number(price);
  if (Number.isNaN(value)) return null;
  return `${currency ?? "KES"} ${value.toLocaleString()}`;
}

export default function AdminProductsPage() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Product[]>([]);

  async function load(query = "") {
    const res = await fetch(`/api/admin/products?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setItems(data.results ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-gray-500">Admin</p>
          <h1 className="text-2xl font-semibold tracking-tight mt-1">
            Manage Products
          </h1>
        </div>

        <div className="flex gap-2">
          <input
            className="ui-input w-full md:w-80"
            placeholder="Search products..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button
            className="ui-button ui-button-light"
            onClick={() => load(q)}
          >
            Search
          </button>
          <Link
            href="/admin/products/new"
            className="ui-button ui-button-dark"
          >
            New
          </Link>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((p) => (
          <Link
            key={p.id}
            href={`/admin/products/${p.id}`}
            className="block rounded-3xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  {p.category?.name ?? "No category"}
                </div>

                <div className="mt-1 text-lg font-semibold truncate">
                  {p.name}
                </div>

                <div className="text-sm text-gray-500 mt-1 truncate">
                  {p.slug}
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {p.featured ? (
                    <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      Featured
                    </span>
                  ) : null}

                  {p.inStock ? (
                    <span className="inline-flex rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                      In stock
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
                      Out of stock
                    </span>
                  )}
                </div>
              </div>

              <div className="md:text-right shrink-0">
                {p.priceOnRequest ? (
                  <div className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800">
                    Price on request
                  </div>
                ) : formatPrice(p.price, p.currency) ? (
                  <div className="text-lg font-semibold text-slate-800">
                    {formatPrice(p.price, p.currency)}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">
                    No price set
                  </div>
                )}

                <div className="mt-3 text-sm font-medium text-gray-700">
                  Edit product →
                </div>
              </div>
            </div>
          </Link>
        ))}

        {items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <h2 className="text-lg font-semibold">No products found</h2>
            <p className="text-sm text-gray-500 mt-2">
              Try a different search or create a new product.
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
}