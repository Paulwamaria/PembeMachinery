import Link from "next/link";
import { getHeroImages } from "@/lib/public-data";

export default async function HeroSection() {
  const heroItems = await getHeroImages();

  const gridItems = [
    heroItems[0] ?? null,
    heroItems[1] ?? null,
    heroItems[2] ?? null,
    heroItems[3] ?? null,
  ];

  return (
    <section className="border-b border-[color:var(--border)] bg-gradient-to-b from-white to-[#f7f8fd]">
      <div className="container-shell py-14 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="brand-chip">
              Machinery • Fabrication • Support
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight leading-tight text-slate-900">
              Modern Machinery Solutions for Real Business Use
            </h1>

            <p className="mt-5 max-w-2xl text-base md:text-lg leading-8 text-[color:var(--text-muted)]">
              Pembe Machinery supplies quality agricultural and processing machinery,
              spare parts, and fabrication support with a faster, cleaner customer
              experience built around direct enquiries and practical service.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="ui-button ui-button-dark">
                Browse Products
              </Link>

              <a
                href="https://wa.me/254721772520?text=Hello%20Pembe%20Machinery,%20I%20would%20like%20to%20request%20a%20quote."
                target="_blank"
                rel="noopener noreferrer"
                className="ui-button ui-button-green"
              >
                Request Quote
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="soft-card p-5">
                <div className="text-2xl font-semibold text-[color:var(--pembe-purple)]">6+</div>
                <div className="mt-1 text-sm text-[color:var(--text-muted)]">Core Categories</div>
              </div>

              <div className="soft-card p-5">
                <div className="text-2xl font-semibold text-[color:var(--pembe-green)]">Fast</div>
                <div className="mt-1 text-sm text-[color:var(--text-muted)]">WhatsApp Quotes</div>
              </div>

              <div className="soft-card p-5">
                <div className="text-2xl font-semibold text-[color:var(--pembe-magenta)]">Kenya</div>
                <div className="mt-1 text-sm text-[color:var(--text-muted)]">Nationwide Reach</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {gridItems.map((item, index) => {
              const offsetClass =
                index === 1
                  ? "translate-y-8"
                  : index === 3
                  ? "-translate-y-8"
                  : "";

              return (
                <div
                  key={item?.id ?? `fallback-${index}`}
                  className={`soft-card min-h-[220px] overflow-hidden ${offsetClass}`}
                >
                  {item?.image ? (
                    <div className="relative h-full min-h-[220px]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4">
                        <div className="text-white text-sm font-medium">
                          {item.name}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full w-full bg-[color:var(--soft)] flex items-center justify-center text-sm text-[color:var(--text-muted)]">
                      Product Image
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
