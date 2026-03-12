import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import HomeGallery from "@/components/HomeGallery";
import HomeVideos from "@/components/HomeVideos";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <HomeGallery />
      <WhyChooseUs />
      <HomeVideos />

      <section className="container-shell py-14">
        <div className="soft-card p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="section-kicker">Get Started</p>
            <h2 className="text-2xl md:text-3xl font-semibold mt-2 text-[color:var(--pembe-purple)]">
              Need a Machine Quote or Fabrication Solution?
            </h2>
            <p className="text-sm text-[color:var(--text-muted)] mt-3 leading-6">
              Reach out directly on WhatsApp for pricing, availability, and delivery details.
            </p>
          </div>

          <a
            href="https://wa.me/254721772520?text=Hello%20Pembe%20Machinery,%20I%20would%20like%20to%20request%20a%20quote."
            target="_blank"
            rel="noopener noreferrer"
            className="ui-button ui-button-green"
          >
            Request Quote on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}