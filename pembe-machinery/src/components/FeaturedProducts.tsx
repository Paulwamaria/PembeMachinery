import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getPublicProducts } from "@/lib/public-data";

export default async function FeaturedProducts() {
  const products = await getPublicProducts({ featured: true });

  if (!products.length) return null;

  return (
    <section className="section-space bg-gray-50 border-y border-gray-200">
      <div className="container-shell">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="section-kicker">Featured</p>
            <h2 className="section-title mt-2">Popular Machinery</h2>
            <p className="mt-3 text-sm md:text-base text-gray-600">
              Highlighted machines ready for customer enquiries.
            </p>
          </div>

          <Link href="/products" className="ui-button ui-button-light w-fit">
            View All Products
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      </div>
    </section>
  );
}