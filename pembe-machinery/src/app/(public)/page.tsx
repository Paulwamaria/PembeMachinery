import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import HomeGallery from "@/components/HomeGallery";
import HomeVideos from "@/components/HomeVideos";
import HomeOffers from "@/components/HomeOffers";
import { COMPANY } from "@/lib/company";

export default function HomePage() {
  const message =
    "Hello Nakuru Rollermill, I would like to request a quote.";
  const whatsappLink =
    "https://wa.me/" +
    COMPANY.whatsapp +
    "?text=" +
    encodeURIComponent(message);

  return (
    <main>
      {/* HERO */}
      <HeroSection />

      {/* 🔥 OFFERS (NEW - high visibility) */}
      <HomeOffers />

      {/* CATEGORIES */}
      <CategoryGrid />

      {/* FEATURED PRODUCTS */}
      <FeaturedProducts />

      {/* WHY CHOOSE US (moved up for trust building) */}
      <WhyChooseUs />

      {/* GALLERY */}
      <HomeGallery />

      {/* VIDEOS */}
      <HomeVideos />

      {/* 🔥 STRONG CTA */}
      <section className="container-shell py-16">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-purple-50 via-white to-green-50 p-8 md:p-12 shadow-sm border border-[color:var(--border)]">

          {/* subtle glow */}
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-purple-200/30 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-green-200/30 blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="section-kicker">Get Started</p>

              <h2 className="text-2xl md:text-3xl font-semibold mt-2 text-[color:var(--pembe-purple)]">
                Need a Rollermill or Poshomill Quote?
              </h2>

              <p className="text-sm text-[color:var(--text-muted)] mt-3 leading-6">
                Talk directly to {COMPANY.contactPerson} for pricing,
                availability, delivery timelines, and expert guidance.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ui-button ui-button-green"
              >
                Request Quote on WhatsApp
              </a>

              <a
                href={"tel:" + COMPANY.phone}
                className="ui-button ui-button-light"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}