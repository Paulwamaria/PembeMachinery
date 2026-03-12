import Link from "next/link";
import AdminProductFilters from "@/components/AdminProductFilters";
import { getAdminCategories, getAdminProducts } from "@/lib/admin-data";

function formatMoney(currency: string, amount: string | null) {
  if (!amount) return "Price on request";
  return `${currency || "KES"} ${amount}`;
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    in_stock?: string;
    featured?: string;
    sort?: string;
  }>;
}) {
  const params = await searchParams;

  const [products, categories] = await Promise.all([
    getAdminProducts(params),
    getAdminCategories(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-kicker">Admin</p>
          <h1 className="section-title">Products</h1>
          <p className="mt-2 text-slate-600">
            Manage marketplace listings, stock status, and featured products.
          </p>
        </div>

        <Link href="/admin/products/new" className="ui-button-green">
          New Product
        </Link>
      </div>

      <AdminProductFilters categories={categories} />

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {products.length} product{products.length === 1 ? "" : "s"} found
        </p>
      </div>

      <div className="soft-card overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Featured</th>
              <th className="p-3">Updated</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b align-top">
                <td className="p-3">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-xs text-slate-500">{product.slug}</div>
                  {product.summary && (
                    <div className="mt-1 max-w-xs text-xs text-slate-600">
                      {product.summary}
                    </div>
                  )}
                </td>

                <td className="p-3">{product.category?.name || "-"}</td>

                <td className="p-3">
                  {product.priceOnRequest
                    ? "Price on request"
                    : formatMoney(
                        product.currency,
                        product.price?.toString() || null
                      )}
                </td>

                <td className="p-3">
                  <span className="brand-badge">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>

                <td className="p-3">
                  <span className="brand-badge">
                    {product.featured ? "Yes" : "No"}
                  </span>
                </td>

                <td className="p-3 whitespace-nowrap">
                  {new Date(product.updatedAt).toLocaleDateString()}
                </td>

                <td className="p-3">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/products/${product.slug}`}
                      target="_blank"
                      className="ui-button"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="ui-button-dark"
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-slate-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}