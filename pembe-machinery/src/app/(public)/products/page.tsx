import Link from "next/link";
import ProductFilters from "@/components/ProductFilters";
import { getAllCategories, getFilteredProducts } from "@/lib/public-data";

function formatMoney(currency: string, amount: string | number | null) {
  if (!amount) return "Price on request";
  return `${currency || "KES"} ${amount}`;
}

function getImage(images: any) {
  if (!images) return null;
  if (Array.isArray(images) && images.length > 0) return images[0];
  return null;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    in_stock?: string;
    featured?: string;
    min_price?: string;
    max_price?: string;
    sort?: string;
  }>;
}) {
  const params = await searchParams;

  const [products, categories] = await Promise.all([
    getFilteredProducts(params),
    getAllCategories(),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <p className="section-kicker">Marketplace</p>
        <h1 className="section-title">Browse Machinery</h1>
        <p className="mt-2 text-slate-600">
          Search, compare, and request quotes for available machines.
        </p>
      </div>

      <div className="mb-6">
        <ProductFilters categories={categories} />
      </div>

      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {products.length} product{products.length === 1 ? "" : "s"} found
        </p>
      </div>

      {products.length === 0 ? (
        <div className="soft-card p-10 text-center">
          <h2 className="text-xl font-semibold">No products found</h2>
          <p className="mt-2 text-slate-600">
            Try adjusting your filters or search terms.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => {
            const image = getImage(product.images);

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="soft-card overflow-hidden transition hover:-translate-y-1"
              >
                <div className="aspect-[4/3] bg-slate-100">
                  {image ? (
                    <img
                      src={image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                      No image
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {product.featured && (
                      <span className="brand-badge">Featured</span>
                    )}
                    {product.inStock ? (
                      <span className="brand-badge">In Stock</span>
                    ) : (
                      <span className="brand-badge">Out of Stock</span>
                    )}
                    {product.category && (
                      <span className="brand-badge">{product.category.name}</span>
                    )}
                  </div>

                  <h2 className="text-lg font-semibold">{product.name}</h2>

                  {product.summary && (
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                      {product.summary}
                    </p>
                  )}

                  <p className="mt-4 text-base font-bold">
                    {product.priceOnRequest
                      ? "Price on request"
                      : formatMoney(product.currency, product.price?.toString() || null)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}