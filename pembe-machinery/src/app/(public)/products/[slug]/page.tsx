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
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="rounded-3xl border overflow-hidden bg-gray-100">
            {images[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={images[0]}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="aspect-[4/3] flex items-center justify-center text-sm opacity-60">
                No image available
              </div>
            )}
          </div>

          {images.length > 1 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {images.slice(1, 7).map((image, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border overflow-hidden bg-gray-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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
          <div className="text-sm uppercase tracking-wide opacity-60">
            {product.category?.name ?? "Machinery"}
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold mt-2">
            {product.name}
          </h1>

          {product.summary ? (
            <p className="text-lg opacity-80 mt-4">{product.summary}</p>
          ) : null}

          <div className="mt-6">
            {product.priceOnRequest ? (
              <div className="inline-flex rounded-full bg-amber-50 text-amber-800 px-4 py-2 text-sm font-medium border border-amber-200">
                Price on request
              </div>
            ) : formatPrice(product.price, product.currency) ? (
              <div className="text-2xl font-semibold text-slate-800">
                {formatPrice(product.price, product.currency)}
              </div>
            ) : (
              <div className="text-sm text-gray-500">Contact for pricing</div>
            )}
          </div>

          {product.description ? (
            <div className="mt-6">
              <h2 className="text-lg font-semibold">Description</h2>
              <p className="opacity-80 mt-2 leading-7">{product.description}</p>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppQuoteButton
              productName={product.name}
              productUrl={productUrl}
            />

            <a
              href="tel:0721772520"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 border"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>

      {specs ? (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Specifications</h2>

          <div className="mt-4 rounded-2xl border overflow-hidden">
            <div className="divide-y">
              {Object.entries(specs).map(([key, value]) => (
                <div
                  key={key}
                  className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-2 px-4 py-3"
                >
                  <div className="font-medium capitalize">
                    {key.replace(/_/g, " ")}
                  </div>
                  <div className="opacity-80">
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