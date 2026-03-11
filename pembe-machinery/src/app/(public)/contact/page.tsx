export default function ContactPage() {
  return (
    <main>
      <section className="border-b border-[color:var(--border)] bg-gradient-to-b from-white to-[color:var(--soft-2)]">
        <div className="container-shell py-14 md:py-18">
          <p className="section-kicker">Contact</p>
          <h1 className="section-title mt-3">
            Get in Touch
          </h1>
          <p className="max-w-3xl mt-5 text-base md:text-lg text-[color:var(--text-muted)] leading-7">
            Reach Pembe Machinery directly for machine enquiries, fabrication support,
            pricing requests, and product availability.
          </p>
        </div>
      </section>

      <section className="container-shell py-14 grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="soft-card p-6">
            <h2 className="text-xl font-semibold text-[color:var(--pembe-purple)]">
              Direct Contact
            </h2>

            <div className="mt-5 space-y-4 text-sm">
              <div>
                <div className="font-medium text-slate-900">Phone</div>
                <a href="tel:0721772520" className="text-[color:var(--text-muted)] hover:text-[color:var(--pembe-purple)]">
                  0721 772 520
                </a>
              </div>

              <div>
                <div className="font-medium text-slate-900">WhatsApp</div>
                <a
                  href="https://wa.me/254721772520"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color:var(--text-muted)] hover:text-[color:var(--pembe-green)]"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <div>
                <div className="font-medium text-slate-900">Email</div>
                <a
                  href="mailto:admin@pembemachinery.co.ke"
                  className="text-[color:var(--text-muted)] hover:text-[color:var(--pembe-magenta)]"
                >
                  admin@pembemachinery.co.ke
                </a>
              </div>

              <div>
                <div className="font-medium text-slate-900">Location</div>
                <div className="text-[color:var(--text-muted)]">Nakuru, Kenya</div>
              </div>
            </div>
          </div>

          <div className="soft-card p-6">
            <h2 className="text-xl font-semibold text-[color:var(--pembe-purple)]">
              Business Hours
            </h2>
            <div className="mt-5 space-y-3 text-sm text-[color:var(--text-muted)]">
              <div className="flex justify-between gap-4">
                <span>Monday - Friday</span>
                <span>8:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Saturday</span>
                <span>8:00 AM - 1:00 PM</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>

          <div className="soft-card p-6">
            <h2 className="text-xl font-semibold text-[color:var(--pembe-purple)]">
              Fastest Way to Get a Quote
            </h2>
            <p className="text-sm text-[color:var(--text-muted)] mt-3 leading-6">
              The fastest response method is WhatsApp. Send the product name,
              quantity, and location, and the team can respond with pricing
              and delivery guidance.
            </p>

            <a
              href="https://wa.me/254721772520?text=Hello%20Pembe%20Machinery,%20I%20would%20like%20a%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-5 ui-button ui-button-green"
            >
              Request Quote on WhatsApp
            </a>
          </div>
        </div>

        <div className="soft-card overflow-hidden min-h-[520px]">
          <div className="h-full w-full flex items-center justify-center text-sm text-[color:var(--text-muted)] bg-[linear-gradient(135deg,rgba(91,44,163,0.08),rgba(45,190,63,0.08))]">
            Google Map / Location Embed Placeholder
          </div>
        </div>
      </section>
    </main>
  );
}
