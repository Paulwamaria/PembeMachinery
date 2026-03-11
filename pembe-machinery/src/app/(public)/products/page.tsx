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
    <main className="container-shell py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-kicker">Catalogue</p>
          <h1 className="section-title mt-2">Products</h1>
          <p className="mt-3 text-sm md:text-base text-[color:var(--text-muted)]">
            Browse available machinery, fabrication solutions, and spare parts.
          </p>
        </div>

        <form className="flex flex-col sm:flex-row gap-2">
          <select
            name="category"
            defaultValue={category ?? ""}
            className="ui-input"
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
            className="ui-input min-w-[240px]"
          />

          <button className="ui-button ui-button-dark">
            Filter
          </button>
        </form>
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        <Link
          href="/products"
          className={`rounded-full border px-3 py-1 text-sm ${
            !category
              ? "text-white border-transparent"
              : "bg-white border-[color:var(--border)] text-slate-700"
          }`}
          style={!category ? { background: "var(--pembe-purple)" } : {}}
        >
          All
        </Link>

        {categories.map((c, index) => {
          const isActive = category === c.slug;
          const colors = [
            "var(--pembe-purple)",
            "var(--pembe-green)",
            "var(--pembe-magenta)",
          ];
          const activeColor = colors[index % colors.length];

          return (
            <Link
              key={c.id}
              href={`/products?category=${c.slug}`}
              className={`rounded-full border px-3 py-1 text-sm ${
                isActive
                  ? "text-white border-transparent"
                  : "bg-white border-[color:var(--border)] text-slate-700"
              }`}
              style={isActive ? { background: activeColor } : {}}
            >
              {c.name}
            </Link>
          );
        })}
      </div>

      {products.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-[color:var(--border)] bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-medium text-[color:var(--pembe-purple)]">
            No products found
          </h2>
          <p className="text-sm text-[color:var(--text-muted)] mt-2">
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
