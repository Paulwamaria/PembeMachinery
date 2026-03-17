import { notFound } from "next/navigation";
import type { Metadata } from "next";
import WhatsAppQuoteButton from "@/components/WhatsAppQuoteButton";
import ProductInquiryForm from "@/components/ProductInquiryForm";
import { getPublicProductBySlug } from "@/lib/public-data";

export const dynamic = "force-dynamic";

function formatMoney(currency: string, amount: string | number | null) {
  if (!amount) return "Price on request";
  return `${currency || "KES"} ${amount}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Nakuru Rollermill & Poshomill Center",
      description: "The requested product could not be found.",
    };
  }

  const title = `${product.name} | Nakuru Rollermill & Poshomill Center`;
  const description =
    product.summary ||
    product.description ||
    `View ${product.name} on Nakuru Rollermill & Poshomill Center and request a quote.`;

  const firstImage =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : null;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: firstImage ? [{ url: firstImage, alt: product.name }] : [],
    },
    twitter: {
      card: firstImage ? "summary_large_image" : "summary",
      title,
      description,
      images: firstImage ? [firstImage] : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);

  if (!product) notFound();

  const images = Array.isArray(product.images) ? product.images : [];
  const specs =
    product.specs && Array.isArray(product.specs)
      ? product.specs
      : product.specs && typeof product.specs === "object"
      ? Object.entries(product.specs).map(([label, value]) => ({
          label,
          value: String(value),
        }))
      : [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border bg-white">
            <div className="grid gap-4 p-4 md:grid-cols-2">
              {images.length > 0 ? (
                images.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className={index === 0 ? "md:col-span-2" : ""}
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-slate-100 text-sm text-slate-400 md:col-span-2">
                  No image available
                </div>
              )}
            </div>
          </div>

          <div className="soft-card p-6">
            <div className="mb-3 flex flex-wrap gap-2">
              {product.category?.name && (
                <span className="brand-badge">{product.category.name}</span>
              )}
              {product.featured && <span className="brand-badge">Featured</span>}
              <span className="brand-badge">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>

            {product.summary && (
              <p className="mt-3 text-base text-slate-600">{product.summary}</p>
            )}

            <div className="mt-5 text-2xl font-bold text-slate-900">
              {product.priceOnRequest
                ? "Price on request"
                : formatMoney(product.currency, product.price?.toString() || null)}
            </div>

            {product.description && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Description</h2>
                <p className="mt-2 whitespace-pre-line text-slate-600">
                  {product.description}
                </p>
              </div>
            )}
          </div>

          {specs.length > 0 && (
            <div className="soft-card p-6">
              <h2 className="text-lg font-semibold">Specifications</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {specs.map((spec, index) => (
                  <div
                    key={`${spec.label}-${index}`}
                    className="rounded-2xl border bg-white p-4"
                  >
                    <div className="text-sm text-slate-500">{spec.label}</div>
                    <div className="mt-1 font-medium text-slate-900">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="soft-card p-5">
            <p className="section-kicker">Quick Action</p>
            <h2 className="section-title text-xl">Request a Quote</h2>
            <p className="mt-2 text-sm text-slate-600">
              Reach out instantly on WhatsApp or send a formal inquiry.
            </p>

            <div className="mt-4">
              <WhatsAppQuoteButton
                productName={product.name}
                className="ui-button-green w-full justify-center"
              />
            </div>
          </div>

          <ProductInquiryForm
            productId={product.id}
            productName={product.name}
          />
        </div>
      </div>
    </main>
  );
}