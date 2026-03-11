export default function ContactPage() {
  return (
    <main>
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-14 md:py-18">
          <p className="text-sm uppercase tracking-wide opacity-60">Contact</p>
          <h1 className="text-4xl md:text-5xl font-semibold mt-3">
            Get in Touch
          </h1>
          <p className="max-w-3xl mt-5 text-base md:text-lg opacity-75 leading-7">
            Reach Pembe Machinery directly for machine enquiries, fabrication support,
            pricing requests, and product availability.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14 grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">Direct Contact</h2>

            <div className="mt-5 space-y-4 text-sm">
              <div>
                <div className="font-medium">Phone</div>
                <a href="tel:0721772520" className="opacity-75 hover:opacity-100">
                  0721 772 520
                </a>
              </div>

              <div>
                <div className="font-medium">WhatsApp</div>
                <a
                  href="https://wa.me/254721772520"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-75 hover:opacity-100"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <div>
                <div className="font-medium">Email</div>
                <a
                  href="mailto:admin@pembemachinery.co.ke"
                  className="opacity-75 hover:opacity-100"
                >
                  admin@pembemachinery.co.ke
                </a>
              </div>

              <div>
                <div className="font-medium">Location</div>
                <div className="opacity-75">Nakuru, Kenya</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">Business Hours</h2>
            <div className="mt-5 space-y-3 text-sm opacity-75">
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

          <div className="rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">Fastest Way to Get a Quote</h2>
            <p className="text-sm opacity-75 mt-3 leading-6">
              The fastest response method is WhatsApp. Send the product name,
              quantity, and location, and the team can respond with pricing
              and delivery guidance.
            </p>

            <a
              href="https://wa.me/254721772520?text=Hello%20Pembe%20Machinery,%20I%20would%20like%20a%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-5 rounded-xl bg-black text-white px-5 py-3 font-medium"
            >
              Request Quote on WhatsApp
            </a>
          </div>
        </div>

        <div className="rounded-3xl border overflow-hidden min-h-[520px] bg-gray-100">
          <div className="h-full w-full flex items-center justify-center text-sm opacity-60">
            Google Map / Location Embed Placeholder
          </div>
        </div>
      </section>
    </main>
  );
}