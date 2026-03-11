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
      className="group block overflow-hidden rounded-3xl border border-[color:var(--border)] bg-white shadow-sm hover:shadow-md transition"
    >
      <div className="aspect-[4/3] overflow-hidden bg-[color:var(--soft)]">
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-[color:var(--text-muted)]">
            No image
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="text-xs uppercase tracking-wide text-[color:var(--text-muted)]">
          {product.category?.name ?? "Machinery"}
        </div>

        <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
          {product.name}
        </h3>

        {product.summary ? (
          <p className="mt-3 text-sm leading-6 text-[color:var(--text-muted)] line-clamp-2">
            {product.summary}
          </p>
        ) : null}

        <div className="mt-4">
          {product.priceOnRequest ? (
            <div className="inline-flex rounded-full border px-3 py-1 text-sm font-medium bg-[rgba(194,24,122,0.08)] text-[color:var(--pembe-magenta)] border-[rgba(194,24,122,0.16)]">
              Price on request
            </div>
          ) : formatPrice(product.price, product.currency) ? (
            <div className="text-base font-semibold text-[color:var(--pembe-purple)]">
              {formatPrice(product.price, product.currency)}
            </div>
          ) : (
            <div className="text-sm text-[color:var(--text-muted)]">Contact for pricing</div>
          )}
        </div>

        <div className="mt-5 text-sm font-medium text-[color:var(--pembe-green)]">
          View details →
        </div>
      </div>
    </Link>
  );
}
