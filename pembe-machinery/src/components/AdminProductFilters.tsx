"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type Category = {
  id: string;
  name: string;
  slug: string;
};

export default function AdminProductFilters({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function clearFilters() {
    startTransition(() => {
      router.push(pathname);
    });
  }

  return (
    <div className="soft-card p-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <input
          type="text"
          placeholder="Search products..."
          defaultValue={searchParams.get("q") || ""}
          className="ui-input w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateParam("q", (e.target as HTMLInputElement).value);
            }
          }}
          onBlur={(e) => updateParam("q", e.target.value)}
        />

        <select
          className="ui-input w-full"
          defaultValue={searchParams.get("category") || ""}
          onChange={(e) => updateParam("category", e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          className="ui-input w-full"
          defaultValue={searchParams.get("in_stock") || ""}
          onChange={(e) => updateParam("in_stock", e.target.value)}
        >
          <option value="">All Stock States</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>

        <select
          className="ui-input w-full"
          defaultValue={searchParams.get("featured") || ""}
          onChange={(e) => updateParam("featured", e.target.value)}
        >
          <option value="">All Listing Types</option>
          <option value="true">Featured</option>
          <option value="false">Not Featured</option>
        </select>

        <select
          className="ui-input w-full"
          defaultValue={searchParams.get("sort") || ""}
          onChange={(e) => updateParam("sort", e.target.value)}
        >
          <option value="">Newest First</option>
          <option value="featured">Featured First</option>
          <option value="name_asc">Name A-Z</option>
          <option value="name_desc">Name Z-A</option>
          <option value="price_asc">Price Low-High</option>
          <option value="price_desc">Price High-Low</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={clearFilters}
          className="ui-button"
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Clear Filters"}
        </button>
      </div>
    </div>
  );
}