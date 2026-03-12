import { getGalleryImages } from "@/lib/public-data";

export default async function AboutPage() {
  const gallery = await getGalleryImages(2);

  return (
    <main>
      <section className="border-b border-[color:var(--border)] bg-gradient-to-b from-white to-[color:var(--soft-2)]">
        <div className="container-shell py-14 md:py-18">
          <p className="section-kicker">About</p>
          <h1 className="section-title mt-3">
            About Pembe Machinery
          </h1>
          <p className="max-w-3xl mt-5 text-base md:text-lg text-[color:var(--text-muted)] leading-7">
            Pembe Machinery is focused on delivering practical machinery solutions,
            fabrication support, and reliable customer service for agricultural,
            commercial, and industrial needs.
          </p>
        </div>
      </section>

      <section className="container-shell py-14 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold text-[color:var(--pembe-purple)]">
            Who We Serve
          </h2>
          <p className="text-sm text-[color:var(--text-muted)] mt-4 leading-7">
            We serve customers looking for dependable machinery, metal fabrication
            support, spare parts, and direct consultation on suitable equipment
            for their operations.
          </p>

          <h2 className="text-2xl font-semibold text-[color:var(--pembe-purple)] mt-10">
            What We Value
          </h2>
          <p className="text-sm text-[color:var(--text-muted)] mt-4 leading-7">
            Practicality, durability, clear communication, and responsive support
            are central to the service experience.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="brand-badge brand-badge-purple">Reliable Machinery</span>
            <span className="brand-badge brand-badge-green">Fast Support</span>
            <span className="brand-badge brand-badge-magenta">Custom Fabrication</span>
          </div>
        </div>

        <div className="grid gap-4">
          {gallery.length ? (
            gallery.map((item) => (
              <div
                key={item.id}
                className="soft-card overflow-hidden min-h-[220px]"
              >
                <img
                  src={item.image!}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ))
          ) : (
            <div className="soft-card overflow-hidden min-h-[360px]">
              <div className="h-full w-full flex items-center justify-center text-sm text-[color:var(--text-muted)] bg-[linear-gradient(135deg,rgba(91,44,163,0.08),rgba(194,24,122,0.08))]">
                Company / Workshop Image
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}