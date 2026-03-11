import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getPublicCategories, getPublicProducts } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;

  const [products, categories] = await Promise.all([
    getPublicProducts({ category, q }),
    getPublicCategories(),
  ]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide opacity-60">Catalogue</p>
          <h1 className="text-3xl font-semibold">Products</h1>
          <p className="mt-2 text-sm opacity-70">
            Browse available machinery, fabrication solutions, and spare parts.
          </p>
        </div>

        <form className="flex flex-col sm:flex-row gap-2">
          <select
            name="category"
            defaultValue={category ?? ""}
            className="border rounded-xl px-3 py-2"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search machines..."
            className="border rounded-xl px-3 py-2 min-w-[240px]"
          />

          <button className="border rounded-xl px-4 py-2">
            Filter
          </button>
        </form>
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        <Link
          href="/products"
          className={`rounded-full border px-3 py-1 text-sm ${
            !category ? "bg-black text-white" : ""
          }`}
        >
          All
        </Link>

        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/products?category=${c.slug}`}
            className={`rounded-full border px-3 py-1 text-sm ${
              category === c.slug ? "bg-black text-white" : ""
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="mt-10 rounded-2xl border p-8 text-center">
          <h2 className="text-xl font-medium">No products found</h2>
          <p className="text-sm opacity-70 mt-2">
            Try changing the category or search term.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      )}
    </main>
  );
}