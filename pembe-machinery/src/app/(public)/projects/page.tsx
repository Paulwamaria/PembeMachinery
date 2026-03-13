import Link from "next/link";
import { getProjectsGallery } from "@/lib/public-data";

export default async function ProjectsPage() {
  const projects = await getProjectsGallery(6);
  const featured = projects[0] ?? null;
  const secondary = projects.slice(1, 3);
  const gallery = projects.slice(0, 6);

  return (
    <main className="section-space">
      <div className="container-shell">
        {/* HEADER */}
        <section className="max-w-3xl">
          <p className="section-kicker">Projects & Work</p>
          <h1 className="section-title mt-2">Projects by Pembe Machinery</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Explore machinery applications, fabrication capability, and examples
            of the type of practical industrial work supported by Pembe Machinery.
          </p>
        </section>

        {/* FEATURE SHOWCASE */}
        <section className="mt-16 grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <h2 className="text-2xl font-semibold text-[color:var(--pembe-purple)]">
              Practical Machinery for Real Operations
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Our work focuses on supplying machinery and fabrication solutions
              that solve real operational needs — from agricultural processing
              to metalwork support and equipment consultation.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              We work with customers who need dependable machines, clear advice,
              and direct support when selecting, fabricating, or maintaining
              practical business equipment.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="brand-badge">Machine Supply</span>
              <span className="brand-badge">Fabrication Work</span>
              <span className="brand-badge">Processing Equipment</span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/70 bg-gradient-to-br from-purple-50 via-white to-green-50 p-4 shadow-sm">
            {featured ? (
              <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
                <Link
                  href={`/products/${featured.slug}`}
                  className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="aspect-[4/4] overflow-hidden bg-slate-100">
                    <img
                      src={featured.image}
                      alt={featured.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <div className="text-xs uppercase tracking-wide text-slate-500">
                      {featured.category?.name ?? "Project"}
                    </div>
                    <div className="mt-2 font-semibold text-slate-900">
                      {featured.name}
                    </div>
                  </div>
                </Link>

                <div className="grid gap-4">
                  {secondary.map((item) => (
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
                Projects showcase coming soon
              </div>
            )}
          </div>
        </section>

        {/* PROJECT TYPES */}
        <section className="mt-20">
          <h2 className="section-title text-center">Types of Work We Support</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="soft-card p-6 text-center">
              <h3 className="text-lg font-semibold">Machine Supply</h3>
              <p className="mt-2 text-sm text-slate-500">
                Reliable machinery for agricultural and processing operations.
              </p>
            </div>

            <div className="soft-card p-6 text-center">
              <h3 className="text-lg font-semibold">Fabrication Support</h3>
              <p className="mt-2 text-sm text-slate-500">
                Custom fabrication and practical workshop-based support.
              </p>
            </div>

            <div className="soft-card p-6 text-center">
              <h3 className="text-lg font-semibold">Spare Parts</h3>
              <p className="mt-2 text-sm text-slate-500">
                Ongoing support for parts replacement and machine continuity.
              </p>
            </div>

            <div className="soft-card p-6 text-center">
              <h3 className="text-lg font-semibold">Consultation</h3>
              <p className="mt-2 text-sm text-slate-500">
                Guidance on suitable equipment for your business needs.
              </p>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="mt-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker">Project Highlights</p>
              <h2 className="section-title mt-2">Work Showcase</h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                Examples of machinery and equipment relevant to the work we support.
              </p>
            </div>

            <Link href="/products" className="ui-button ui-button-light w-fit">
              Browse Catalogue
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {gallery.map((item) => (
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
                  {item.summary && (
                    <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                      {item.summary}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 text-center">
          <h2 className="section-title">
            Need a Machine or Fabrication Solution?
          </h2>

          <p className="mt-4 text-slate-600">
            Talk to us about the equipment or support you need and get a fast quotation.
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