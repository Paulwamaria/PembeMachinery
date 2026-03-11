import Link from "next/link";

const categories = [
  { slug: "posho-mills", name: "Posho Mills", desc: "Reliable milling solutions for homes and businesses." },
  { slug: "maize-shellers", name: "Maize Shellers", desc: "Efficient shelling machines for agricultural operations." },
  { slug: "chaff-cutters", name: "Chaff Cutters", desc: "Feed preparation equipment for livestock operations." },
  { slug: "mixers", name: "Mixers", desc: "Durable mixing equipment for production and processing." },
  { slug: "spare-parts", name: "Spare Parts", desc: "Essential replacement parts and maintenance support." },
  { slug: "fabrication", name: "Fabrication", desc: "Custom fabrication work tailored to machinery needs." },
];

export default function CategoryGrid() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="max-w-2xl">
          <p className="section-kicker">Categories</p>
          <h2 className="section-title mt-2">Explore Machinery by Category</h2>
          <p className="mt-4 text-sm md:text-base text-gray-600 leading-7">
            Quickly browse the main equipment lines available from Pembe Machinery.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="soft-card p-6 hover:-translate-y-1 hover:shadow-md transition"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white font-semibold shadow-sm">
                {category.name.slice(0, 2).toUpperCase()}
              </div>

              <h3 className="mt-5 text-lg font-semibold">{category.name}</h3>
              <p className="mt-3 text-sm text-gray-600 leading-6">{category.desc}</p>
              <div className="mt-5 text-sm font-medium text-gray-800">View category →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}