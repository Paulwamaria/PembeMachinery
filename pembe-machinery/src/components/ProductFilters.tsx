"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type Category = {
  id: string;
  name: string;
  slug: string;
};

export default function ProductFilters({
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
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <input
          type="text"
          placeholder="Search machinery..."
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
          <option value="">Availability</option>
          <option value="true">In Stock</option>
        </select>

        <select
          className="ui-input w-full"
          defaultValue={searchParams.get("featured") || ""}
          onChange={(e) => updateParam("featured", e.target.value)}
        >
          <option value="">Listing Type</option>
          <option value="true">Featured Only</option>
        </select>

        <input
          type="number"
          min="0"
          placeholder="Min Price"
          defaultValue={searchParams.get("min_price") || ""}
          className="ui-input w-full"
          onBlur={(e) => updateParam("min_price", e.target.value)}
        />

        <input
          type="number"
          min="0"
          placeholder="Max Price"
          defaultValue={searchParams.get("max_price") || ""}
          className="ui-input w-full"
          onBlur={(e) => updateParam("max_price", e.target.value)}
        />
      </div>

      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <select
          className="ui-input md:max-w-xs"
          defaultValue={searchParams.get("sort") || ""}
          onChange={(e) => updateParam("sort", e.target.value)}
        >
          <option value="">Newest First</option>
          <option value="featured">Featured First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A to Z</option>
          <option value="oldest">Oldest First</option>
        </select>

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