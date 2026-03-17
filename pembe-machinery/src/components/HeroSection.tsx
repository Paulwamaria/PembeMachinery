import Link from "next/link";
import HeroMachineShowcase from "@/components/HeroMachineShowcase";
import { getHeroImages } from "@/lib/public-data";

export default async function HeroSection() {
  const heroItems = await getHeroImages(6);

  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <div className="inline-flex rounded-full border border-[color:var(--pembe-purple)]/15 bg-[color:var(--pembe-purple)]/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--pembe-purple)]">
              Machinery • Fabrication • Support
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 md:text-6xl">
              Modern Machinery Solutions for Real Business Use
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Nakuru Rollermill & Poshomill Center supplies quality agricultural and processing machinery,
              spare parts, and fabrication support with faster, clearer customer
              service built around direct enquiries and practical business needs.
            </p>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Trusted machinery support for farmers, processors, and fabricators across Kenya.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/products" className="ui-button">
                Browse Products
              </Link>
              <Link href="/contact" className="ui-button-green">
                Request Quote
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="soft-card p-5">
                <div className="text-4xl font-bold text-[color:var(--pembe-purple)]">
                  6+
                </div>
                <div className="mt-2 text-sm text-slate-500">
                  Machinery Categories
                </div>
              </div>

              <div className="soft-card p-5">
                <div className="text-4xl font-bold text-[color:var(--pembe-green)]">
                  Fast
                </div>
                <div className="mt-2 text-sm text-slate-500">
                  WhatsApp Quotations
                </div>
              </div>

              <div className="soft-card p-5">
                <div className="text-4xl font-bold text-[color:var(--pembe-magenta)]">
                  Kenya
                </div>
                <div className="mt-2 text-sm text-slate-500">
                  Nationwide Reach
                </div>
              </div>
            </div>
          </div>

          <HeroMachineShowcase items={heroItems} />
        </div>
      </div>
    </section>
  );
}