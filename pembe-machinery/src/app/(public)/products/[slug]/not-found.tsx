import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold">Product not found</h1>
      <p className="mt-3 opacity-70">
        The product you are looking for does not exist or is currently unavailable.
      </p>

      <Link
        href="/products"
        className="inline-flex mt-6 border rounded-xl px-4 py-2"
      >
        Back to Products
      </Link>
    </main>
  );
}