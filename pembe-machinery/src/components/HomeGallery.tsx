import Link from "next/link";
import { getGalleryImages } from "@/lib/public-data";

export default async function HomeGallery() {
  const items = await getGalleryImages(4);

  if (!items.length) return null;

  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="section-kicker">Visual Showcase</p>
            <h2 className="section-title mt-2">Recent Machinery Highlights</h2>
            <p className="mt-3 text-sm md:text-base text-[color:var(--text-muted)]">
              Real catalogue visuals pulled directly from your product uploads.
            </p>
          </div>

          <Link href="/products" className="ui-button ui-button-light w-fit">
            Browse Catalogue
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.slug}`}
              className="soft-card overflow-hidden hover:shadow-md transition"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image!}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="text-xs uppercase tracking-wide text-[color:var(--text-muted)]">
                  {item.category?.name ?? "Machinery"}
                </div>
                <div className="mt-2 font-semibold text-slate-900">
                  {item.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}