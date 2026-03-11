import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [totalProducts, featuredProducts, inStockProducts, totalCategories] =
    await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { featured: true } }),
      prisma.product.count({ where: { inStock: true } }),
      prisma.category.count(),
    ]);

  const recentProducts = await prisma.product.findMany({
    orderBy: { updatedAt: "desc" },
    take: 5,
    include: { category: true },
  });

  return (
    <main>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-gray-500">
            Admin
          </p>
          <h1 className="text-3xl font-semibold tracking-tight mt-1">
            Dashboard
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Overview of products, categories, and current catalogue status.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link href="/admin/products" className="ui-button ui-button-light">
            Manage Products
          </Link>
          <Link href="/admin/products/new" className="ui-button ui-button-dark">
            New Product
          </Link>
        </div>
      </div>

      <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
        <div className="soft-card p-5">
          <div className="text-sm text-gray-500">Total Products</div>
          <div className="text-3xl font-semibold mt-2">{totalProducts}</div>
        </div>

        <div className="soft-card p-5">
          <div className="text-sm text-gray-500">Featured Products</div>
          <div className="text-3xl font-semibold mt-2">{featuredProducts}</div>
        </div>

        <div className="soft-card p-5">
          <div className="text-sm text-gray-500">In Stock</div>
          <div className="text-3xl font-semibold mt-2">{inStockProducts}</div>
        </div>

        <div className="soft-card p-5">
          <div className="text-sm text-gray-500">Categories</div>
          <div className="text-3xl font-semibold mt-2">{totalCategories}</div>
        </div>
      </section>

      <section className="grid lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 soft-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Recently Updated Products</h2>
              <p className="text-sm text-gray-500 mt-1">
                Latest changes in your catalogue.
              </p>
            </div>

            <Link href="/admin/products" className="text-sm font-medium text-gray-700">
              View all →
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {recentProducts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
                No products yet.
              </div>
            ) : (
              recentProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/admin/products/${product.id}`}
                  className="block rounded-2xl border border-gray-200 bg-white p-4 hover:shadow-sm transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-wide text-gray-500">
                        {product.category?.name ?? "No category"}
                      </div>
                      <div className="font-semibold mt-1">{product.name}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {product.slug}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {product.featured ? (
                        <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                          Featured
                        </span>
                      ) : null}

                      {product.inStock ? (
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
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="soft-card p-6">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <p className="text-sm text-gray-500 mt-1">
            Jump straight into common admin tasks.
          </p>

          <div className="mt-5 grid gap-3">
            <Link
              href="/admin/products/new"
              className="rounded-2xl border border-gray-200 bg-white p-4 hover:shadow-sm transition"
            >
              <div className="font-medium">Add New Product</div>
              <div className="text-sm text-gray-500 mt-1">
                Create a new catalogue item with price, images, and specs.
              </div>
            </Link>

            <Link
              href="/admin/products"
              className="rounded-2xl border border-gray-200 bg-white p-4 hover:shadow-sm transition"
            >
              <div className="font-medium">Edit Products</div>
              <div className="text-sm text-gray-500 mt-1">
                Update pricing, stock status, and featured items.
              </div>
            </Link>

            <Link
              href="/admin/categories"
              className="rounded-2xl border border-gray-200 bg-white p-4 hover:shadow-sm transition"
            >
              <div className="font-medium">Manage Categories</div>
              <div className="text-sm text-gray-500 mt-1">
                Keep catalogue structure clean and organized.
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}