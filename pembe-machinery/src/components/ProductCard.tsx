import Link from "next/link";

type Product = {
  id: string;
  slug: string;
  name: string;
  summary: string | null;
  images: unknown;
  price?: string | number | null;
  currency?: string | null;
  priceOnRequest?: boolean;
  category?: {
    name: string;
    slug: string;
  } | null;
};

function getFirstImage(images: unknown): string | null {
  if (!Array.isArray(images)) return null;

  const firstValid = images.find(
    (img) => typeof img === "string" && img.trim().length > 0
  );

  return typeof firstValid === "string" ? firstValid : null;
}

function formatPrice(price: unknown, currency?: string | null) {
  if (price === null || price === undefined || price === "") return null;
  const value = Number(price);
  if (Number.isNaN(value)) return null;
  return `${currency ?? "KES"} ${value.toLocaleString()}`;
}

export default function ProductCard({ product }: { product: Product }) {
  const image = getFirstImage(product.images);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
            No image
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="text-xs uppercase tracking-wide text-gray-500">
          {product.category?.name ?? "Machinery"}
        </div>

        <h3 className="mt-2 text-lg font-semibold tracking-tight">
          {product.name}
        </h3>

        {product.summary ? (
          <p className="mt-3 text-sm text-gray-600 leading-6 line-clamp-2">
            {product.summary}
          </p>
        ) : null}

        <div className="mt-4">
          {product.priceOnRequest ? (
            <div className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800">
              Price on request
            </div>
          ) : formatPrice(product.price, product.currency) ? (
            <div className="text-base font-semibold text-slate-800">
              {formatPrice(product.price, product.currency)}
            </div>
          ) : (
            <div className="text-sm text-gray-500">Contact for pricing</div>
          )}
        </div>

        <div className="mt-5 text-sm font-medium">View details →</div>
      </div>
    </Link>
  );
}