import WhatsAppQuoteButton from "@/components/WhatsAppQuoteButton";

async function getProduct(slug: string) {
  const res = await fetch(`http://localhost:3000/api/products/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) return <main className="p-6">Not found</main>;

  const productUrl = `https://example.com/products/${product.slug}`; // replace with real domain later

  return (
    <main className="max-w-5xl mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="aspect-[4/3] rounded-2xl bg-gray-100" />
        <div>
          <div className="text-sm opacity-70">{product.category?.name}</div>
          <h1 className="text-3xl font-semibold mt-1">{product.name}</h1>
          <p className="opacity-80 mt-3">{product.description ?? ""}</p>

          <div className="mt-6 flex gap-3">
            <WhatsAppQuoteButton productName={product.name} productUrl={productUrl} />
          </div>

          {product.specs ? (
            <div className="mt-8">
              <h2 className="text-lg font-semibold">Specifications</h2>
              <pre className="mt-2 p-3 rounded-xl bg-gray-50 border text-sm overflow-auto">
{JSON.stringify(product.specs, null, 2)}
              </pre>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}