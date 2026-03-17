import Link from "next/link";
import { COMPANY } from "@/lib/company";

const primaryPhoneRaw = COMPANY.phone.replace(/\s+/g, "");
const primaryPhoneDigits = COMPANY.phone.replace(/[^\d]/g, "");
const primaryWhatsAppLink = "https://wa.me/" + COMPANY.whatsapp;
const primaryTelLink = "tel:" + primaryPhoneRaw;
const primaryMailLink = "mailto:" + COMPANY.email;

const contactPeople = [
  {
    name: COMPANY.contactPerson,
    role: "Sales & Quotations",
    phone: COMPANY.phone,
    email: COMPANY.email,
    image: "/images/contact/contact-1.png",
  },
  {
    name: "Customer Support Desk",
    role: "Operations & Support",
    phone: COMPANY.phone,
    email: COMPANY.email,
    image: "/images/contact/contact-2.png",
  },
];

export default function ContactPage() {
  return (
    <main className="section-space">
      <div className="container-shell">
        <section className="max-w-3xl">
          <p className="section-kicker">Contact Us</p>
          <h1 className="section-title mt-2">
            Get in Touch with {COMPANY.name}
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Reach out for rollermill enquiries, poshomill support, spare parts,
            quotations, and business guidance. We are ready to help you find the
            most practical solution for your needs.
          </p>
        </section>

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
                    href={primaryTelLink}
                    className="mt-1 block font-semibold text-slate-900"
                  >
                    {COMPANY.phone}
                  </a>
                </div>

                <div className="rounded-2xl border bg-white p-4">
                  <div className="text-sm text-slate-500">Email</div>
                  <a
                    href={primaryMailLink}
                    className="mt-1 block font-semibold text-slate-900"
                  >
                    {COMPANY.email}
                  </a>
                </div>

                <div className="rounded-2xl border bg-white p-4">
                  <div className="text-sm text-slate-500">WhatsApp</div>
                  <a
                    href={primaryWhatsAppLink}
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
                    Nakuru, Kenya
                  </div>
                  <div className="text-sm text-slate-500">
                    Serving customers across Kenya
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
                  href={primaryWhatsAppLink}
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

          <div>
            <h2 className="text-2xl font-semibold text-[color:var(--pembe-purple)]">
              Contact Persons
            </h2>
            <p className="mt-3 text-slate-600">
              Reach out directly for quotations, support, and business enquiries.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {contactPeople.map((person) => {
                const personPhoneRaw = person.phone.replace(/\s+/g, "");
                const personPhoneDigits = person.phone.replace(/[^\d]/g, "");
                const personTelLink = "tel:" + personPhoneRaw;
                const personMailLink = "mailto:" + person.email;
                const personWhatsAppLink = "https://wa.me/" + personPhoneDigits;

                return (
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
                            href={personTelLink}
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
                            href={personMailLink}
                            className="mt-1 block font-medium text-slate-900"
                          >
                            {person.email}
                          </a>
                        </div>

                        <div className="pt-2">
                          <a
                            href={personWhatsAppLink}
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
                );
              })}
            </div>
          </div>
        </section>

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
              src="https://maps.google.com/maps?q=Nakuru%2C%20Kenya&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="420"
              loading="lazy"
              className="w-full"
            />
          </div>
        </section>

        <section className="mt-20 text-center">
          <h2 className="section-title">
            Let’s Help You Find the Right Milling Solution
          </h2>

          <p className="mt-4 text-slate-600">
            Whether you need a rollermill, poshomill support, spare parts, or a
            quick quote, our team is ready to help.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={primaryWhatsAppLink}
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