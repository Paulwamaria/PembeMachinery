import Link from "next/link";

const contactPeople = [
  {
    name: "John Kamau",
    role: "Sales Manager",
    phone: "+254721772520",
    email: "sales@pembemachinery.com",
    image: "/images/contact/contact-1.png",
  },
  {
    name: "Mary Wanjiku",
    role: "Operations Coordinator",
    phone: "+254700000000",
    email: "operations@pembemachinery.com",
    image: "/images/contact/contact-2.png",
  },
];

export default function ContactPage() {
  return (
    <main className="section-space">
      <div className="container-shell">
        {/* HEADER */}
        <section className="max-w-3xl">
          <p className="section-kicker">Contact Us</p>
          <h1 className="section-title mt-2">Get in Touch with Pembe Machinery</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Reach out for machinery enquiries, fabrication support, spare parts,
            or quick quotations. We are ready to guide you toward the most
            practical solution for your business.
          </p>
        </section>

        {/* MAIN CONTACT GRID */}
        <section className="mt-16 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <div className="soft-card rounded-[1.75rem] p-6">
              <h2 className="text-2xl font-semibold text-[color:var(--pembe-purple)]">
                Company Contact Details
              </h2>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border bg-white p-4">
                  <div className="text-sm text-slate-500">Phone</div>
                  <a
                    href="tel:+254721772520"
                    className="mt-1 block font-semibold text-slate-900"
                  >
                    +254 721 772 520
                  </a>
                </div>

                <div className="rounded-2xl border bg-white p-4">
                  <div className="text-sm text-slate-500">Email</div>
                  <a
                    href="mailto:info@pembemachinery.com"
                    className="mt-1 block font-semibold text-slate-900"
                  >
                    info@pembemachinery.com
                  </a>
                </div>

                <div className="rounded-2xl border bg-white p-4">
                  <div className="text-sm text-slate-500">WhatsApp</div>
                  <a
                    href="https://wa.me/254721772520"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block font-semibold text-slate-900"
                  >
                    Chat on WhatsApp
                  </a>
                </div>

                <div className="rounded-2xl border bg-white p-4">
                  <div className="text-sm text-slate-500">Business Hours</div>
                  <div className="mt-1 font-semibold text-slate-900">
                    Monday - Saturday
                  </div>
                  <div className="text-sm text-slate-500">
                    8:00 AM - 6:00 PM
                  </div>
                </div>

                <div className="rounded-2xl border bg-white p-4">
                  <div className="text-sm text-slate-500">Location</div>
                  <div className="mt-1 font-semibold text-slate-900">
                    Nairobi, Kenya
                  </div>
                  <div className="text-sm text-slate-500">
                    Nationwide machinery support and enquiries
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-gradient-to-br from-purple-50 via-white to-green-50 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                Need a Quick Quotation?
              </h2>
              <p className="mt-3 text-slate-600">
                The fastest way to get started is to contact us directly with the
                machine or service you need.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/254721772520"
                  target="_blank"
                  rel="noreferrer"
                  className="ui-button-green"
                >
                  WhatsApp Us
                </a>

                <Link href="/products" className="ui-button">
                  Browse Products
                </Link>
              </div>
            </div>
          </div>

          {/* CONTACT PERSONS */}
          <div>
            <h2 className="text-2xl font-semibold text-[color:var(--pembe-purple)]">
              Contact Persons
            </h2>
            <p className="mt-3 text-slate-600">
              Reach out directly to the relevant person for sales, quotations,
              operations, and support.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {contactPeople.map((person) => (
                <div
                  key={person.name}
                  className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="aspect-[4/4] overflow-hidden bg-slate-100">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <div className="brand-badge inline-block">{person.role}</div>

                    <h3 className="mt-3 text-xl font-semibold text-slate-900">
                      {person.name}
                    </h3>

                    <div className="mt-4 space-y-3">
                      <div>
                        <div className="text-xs uppercase tracking-wide text-slate-500">
                          Phone
                        </div>
                        <a
                          href={`tel:${person.phone.replace(/\s+/g, "")}`}
                          className="mt-1 block font-medium text-slate-900"
                        >
                          {person.phone}
                        </a>
                      </div>

                      <div>
                        <div className="text-xs uppercase tracking-wide text-slate-500">
                          Email
                        </div>
                        <a
                          href={`mailto:${person.email}`}
                          className="mt-1 block font-medium text-slate-900"
                        >
                          {person.email}
                        </a>
                      </div>

                      <div className="pt-2">
                        <a
                          href={`https://wa.me/${person.phone.replace(/[^\d]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="ui-button-green w-full justify-center"
                        >
                          Contact on WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MAP */}
        <section className="mt-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker">Location</p>
              <h2 className="section-title mt-2">Find Us</h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                Visit us or reach out remotely for machinery enquiries and support.
              </p>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <iframe
              src="https://maps.google.com/maps?q=Nairobi%2C%20Kenya&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="420"
              loading="lazy"
              className="w-full"
            />
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 text-center">
          <h2 className="section-title">
            Let’s Help You Find the Right Machinery Solution
          </h2>

          <p className="mt-4 text-slate-600">
            Whether you need a machine, fabrication support, or a quick quote,
            our team is ready to help.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/254721772520"
              target="_blank"
              rel="noreferrer"
              className="ui-button-green"
            >
              Chat on WhatsApp
            </a>

            <Link href="/products" className="ui-button">
              Browse Products
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}