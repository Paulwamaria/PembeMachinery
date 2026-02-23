import Link from "next/link";

async function getProducts(params: { category?: string; q?: string }) {
  const sp = new URLSearchParams();
  if (params.category) sp.set("category", params.category);
  if (params.q) sp.set("q", params.q);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/products?${sp.toString()}`, {
    cache: "no-store",
  });

  // For local dev without NEXT_PUBLIC_BASE_URL, fallback:
  if (!res.ok) {
    const res2 = await fetch(`http://localhost:3000/api/products?${sp.toString()}`, { cache: "no-store" });
    return res2.json();
  }

  return res.json();
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; q?: string };
}) {
  const data = await getProducts({ category: searchParams.category, q: searchParams.q });
  const products = data.results ?? [];

  return (
    <main className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>

        <form className="flex gap-2">
          <input
            name="q"
            defaultValue={searchParams.q ?? ""}
            placeholder="Search products..."
            className="border rounded-xl px-3 py-2 w-full md:w-72"
          />
          <button className="border rounded-xl px-4 py-2">Search</button>
        </form>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {products.map((p: any) => (
          <Link key={p.id} href={`/products/${p.slug}`} className="border rounded-2xl p-4 hover:shadow-sm">
            <div className="aspect-[4/3] rounded-xl bg-gray-100 overflow-hidden mb-3">
              {/* image later */}
            </div>
            <div className="text-sm opacity-70">{p.category?.name}</div>
            <div className="font-medium">{p.name}</div>
            <div className="text-sm opacity-70 mt-1">{p.summary ?? ""}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}