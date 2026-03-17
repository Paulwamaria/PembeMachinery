import Link from "next/link";
import { getAboutGallery } from "@/lib/public-data";

export default async function AboutPage() {
  const gallery = await getAboutGallery(6);
  const leadImage = gallery[0] ?? null;
  const sideImages = gallery.slice(1, 3);
  const gridImages = gallery.slice(0, 6);

  return (
    <main className="section-space">
      <div className="container-shell">
        <section className="max-w-3xl">
          <p className="section-kicker">About Us</p>
          <h1 className="section-title mt-2">About Nakuru Rollermill & Poshomill Center</h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Nakuru Rollermill & Poshomill Center delivers practical machinery solutions, fabrication
            support, and reliable customer service for agricultural, commercial,
            and industrial operations across Kenya.
          </p>
        </section>

        <section className="mt-16 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-2xl font-semibold text-[color:var(--pembe-purple)]">
              Our Story
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Nakuru Rollermill & Poshomill Center was founded to bridge the gap between dependable
              machinery supply and practical fabrication support. Many
              businesses struggle to find durable equipment backed by responsive
              service, spare parts support, and clear guidance.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Our mission is to help farmers, processors, and growing
              industries access reliable machines, fabrication expertise, and
              straightforward consultation so their operations can run
              efficiently and grow sustainably.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="brand-badge">Reliable Machinery</span>
              <span className="brand-badge">Fast Support</span>
              <span className="brand-badge">Custom Fabrication</span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/70 bg-gradient-to-br from-purple-50 via-white to-green-50 p-4 shadow-sm">
            {leadImage ? (
              <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
                <Link
                  href={`/products/${leadImage.slug}`}
                  className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="aspect-[4/4] overflow-hidden bg-slate-100">
                    <img
                      src={leadImage.image}
                      alt={leadImage.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="grid gap-4">
                  {sideImages.map((item) => (
                    <Link
                      key={item.id}
                      href={`/products/${item.slug}`}
                      className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[320px] items-center justify-center rounded-[1.75rem] border border-dashed text-slate-400">
                Gallery coming soon
              </div>
            )}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="section-title text-center">Who We Serve</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="soft-card p-6 text-center">
              <h3 className="text-lg font-semibold">Farmers</h3>
              <p className="mt-2 text-sm text-slate-500">
                Agricultural processing and production machinery.
              </p>
            </div>

            <div className="soft-card p-6 text-center">
              <h3 className="text-lg font-semibold">Processors</h3>
              <p className="mt-2 text-sm text-slate-500">
                Grain and crop processing equipment.
              </p>
            </div>

            <div className="soft-card p-6 text-center">
              <h3 className="text-lg font-semibold">Small Industries</h3>
              <p className="mt-2 text-sm text-slate-500">
                Commercial machinery for small and growing businesses.
              </p>
            </div>

            <div className="soft-card p-6 text-center">
              <h3 className="text-lg font-semibold">Fabricators</h3>
              <p className="mt-2 text-sm text-slate-500">
                Custom metal fabrication and machine support.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-[2rem] bg-slate-50 p-10">
          <h2 className="section-title text-center">Why Choose Nakuru Rollermill & Poshomill Center</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[color:var(--pembe-purple)]">
                Durable
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Machines built for practical daily use.
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-[color:var(--pembe-green)]">
                Fast
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Quick quotations and responsive service.
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-[color:var(--pembe-magenta)]">
                Local
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Fabrication expertise tailored for Kenya.
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-slate-800">
                Support
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Spare parts and consultation when you need it.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker">Our Machines</p>
              <h2 className="section-title mt-2">Catalogue Highlights</h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                A look at some of the machines and equipment available through
                Nakuru Rollermill & Poshomill Center.
              </p>
            </div>

            <Link href="/products" className="ui-button ui-button-light w-fit">
              Browse Catalogue
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {gridImages.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.slug}`}
                className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <div className="text-xs uppercase tracking-wide text-slate-500">
                    {item.category?.name ?? "Machinery"}
                  </div>
                  <div className="mt-2 font-semibold text-slate-900">
                    {item.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-20 text-center">
          <h2 className="section-title">
            Need Machinery or Fabrication Support?
          </h2>

          <p className="mt-4 text-slate-600">
            Browse our machinery catalogue or contact us directly for a fast
            quotation.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/products" className="ui-button">
              Browse Products
            </Link>

            <Link href="/contact" className="ui-button-green">
              Request Quote
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}