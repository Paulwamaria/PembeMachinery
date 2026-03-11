import { notFound } from "next/navigation";
import WhatsAppQuoteButton from "@/components/WhatsAppQuoteButton";
import { getPublicProductBySlug } from "@/lib/public-data";

export const dynamic = "force-dynamic";

function normalizeImages(images: unknown): string[] {
  if (Array.isArray(images)) {
    return images.filter((x): x is string => typeof x === "string");
  }
  return [];
}

function normalizeSpecs(specs: unknown): Record<string, unknown> | null {
  if (specs && typeof specs === "object" && !Array.isArray(specs)) {
    return specs as Record<string, unknown>;
  }
  return null;
}

function formatPrice(price: unknown, currency?: string | null) {
  if (price === null || price === undefined || price === "") return null;
  const value = Number(price);
  if (Number.isNaN(value)) return null;
  return `${currency ?? "KES"} ${value.toLocaleString()}`;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);

  if (!product || !product.inStock) {
    notFound();
  }

  const images = normalizeImages(product.images);
  const specs = normalizeSpecs(product.specs);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const productUrl = `${siteUrl}/products/${product.slug}`;

  return (
    <main className="container-shell py-10">
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="rounded-3xl border border-[color:var(--border)] overflow-hidden bg-[color:var(--soft)] shadow-sm">
            {images[0] ? (
              <img
                src={images[0]}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="aspect-[4/3] flex items-center justify-center text-sm text-[color:var(--text-muted)]">
                No image available
              </div>
            )}
          </div>

          {images.length > 1 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {images.slice(1, 7).map((image, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-[color:var(--border)] overflow-hidden bg-[color:var(--soft)]"
                >
                  <img
                    src={image}
                    alt={`${product.name} ${idx + 2}`}
                    className="w-full h-28 object-cover"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <div className="text-sm uppercase tracking-wide text-[color:var(--text-muted)]">
            {product.category?.name ?? "Machinery"}
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold mt-2 text-slate-900">
            {product.name}
          </h1>

          {product.summary ? (
            <p className="text-lg text-[color:var(--text-muted)] mt-4">
              {product.summary}
            </p>
          ) : null}

          <div className="mt-6">
            {product.priceOnRequest ? (
              <div className="inline-flex rounded-full px-4 py-2 text-sm font-medium border bg-[rgba(194,24,122,0.08)] text-[color:var(--pembe-magenta)] border-[rgba(194,24,122,0.16)]">
                Price on request
              </div>
            ) : formatPrice(product.price, product.currency) ? (
              <div className="text-2xl font-semibold text-[color:var(--pembe-purple)]">
                {formatPrice(product.price, product.currency)}
              </div>
            ) : (
              <div className="text-sm text-[color:var(--text-muted)]">
                Contact for pricing
              </div>
            )}
          </div>

          {product.description ? (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-[color:var(--pembe-purple)]">
                Description
              </h2>
              <p className="text-[color:var(--text-muted)] mt-2 leading-7">
                {product.description}
              </p>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppQuoteButton
              productName={product.name}
              productUrl={productUrl}
            />

            <a
              href="tel:0721772520"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 border border-[color:var(--border)] bg-white"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>

      {specs ? (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-[color:var(--pembe-purple)]">
            Specifications
          </h2>

          <div className="mt-4 rounded-3xl border border-[color:var(--border)] overflow-hidden bg-white shadow-sm">
            <div className="divide-y divide-[color:var(--border)]">
              {Object.entries(specs).map(([key, value]) => (
                <div
                  key={key}
                  className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-2 px-4 py-3"
                >
                  <div className="font-medium capitalize text-slate-900">
                    {key.replace(/_/g, " ")}
                  </div>
                  <div className="text-[color:var(--text-muted)]">
                    {typeof value === "string"
                      ? value
                      : JSON.stringify(value)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
