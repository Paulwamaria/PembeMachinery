export default function AboutPage() {
  return (
    <main>
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-14 md:py-18">
          <p className="text-sm uppercase tracking-wide opacity-60">About</p>
          <h1 className="text-4xl md:text-5xl font-semibold mt-3">
            About Pembe Machinery
          </h1>
          <p className="max-w-3xl mt-5 text-base md:text-lg opacity-75 leading-7">
            Pembe Machinery is focused on delivering practical machinery solutions,
            fabrication support, and reliable customer service for agricultural,
            commercial, and industrial needs.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold">Who We Serve</h2>
          <p className="text-sm opacity-75 mt-4 leading-7">
            We serve customers looking for dependable machinery, metal fabrication
            support, spare parts, and direct consultation on suitable equipment
            for their operations.
          </p>

          <h2 className="text-2xl font-semibold mt-10">What We Value</h2>
          <p className="text-sm opacity-75 mt-4 leading-7">
            Practicality, durability, clear communication, and responsive support
            are central to the service experience.
          </p>
        </div>

        <div className="rounded-3xl border overflow-hidden bg-gray-100 min-h-[360px]">
          <div className="h-full w-full flex items-center justify-center text-sm opacity-60">
            Company / Workshop Image Placeholder
          </div>
        </div>
      </section>
    </main>
  );
}