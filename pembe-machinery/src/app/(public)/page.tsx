import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <WhyChooseUs />

      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="rounded-3xl border p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-wide opacity-60">Get Started</p>
            <h2 className="text-2xl md:text-3xl font-semibold mt-2">
              Need a Machine Quote or Fabrication Solution?
            </h2>
            <p className="text-sm opacity-70 mt-3 leading-6">
              Reach out directly on WhatsApp for pricing, availability, and delivery details.
            </p>
          </div>

          <a
            href="https://wa.me/254780404626?text=Hello%20Pembe%20Machinery,%20I%20would%20like%20to%20request%20a%20quote."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-xl bg-black text-white px-5 py-3 font-medium"
          >
            Request Quote on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}