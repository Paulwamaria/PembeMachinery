import Link from "next/link";
import { COMPANY } from "@/lib/company";

const services = [
  {
    title: "Rollermill Supply",
    text: "Supply of reliable rollermills for commercial grain processing, business use, and production-focused operations.",
    badge: "Core Service",
  },
  {
    title: "Poshomill Supply",
    text: "Supply of durable poshomills suitable for small businesses, shops, and customer-serving milling operations.",
    badge: "Popular",
  },
  {
    title: "Custom Fabrication",
    text: "Fabrication services tailored to specific machinery and metalwork needs for commercial and industrial use.",
    badge: "Workshop Support",
  },
  {
    title: "Spare Parts Support",
    text: "Access to essential spare parts and replacement components to keep machines running efficiently.",
    badge: "Maintenance",
  },
  {
    title: "Machine Consultation",
    text: "Guidance on selecting the right machine based on production goals, workload, and operating environment.",
    badge: "Guidance",
  },
  {
    title: "Maintenance Support",
    text: "Assistance with servicing, basic machine upkeep, and maintenance recommendations for continuity.",
    badge: "After-Sale Care",
  },
];

const processSteps = [
  {
    n: "01",
    title: "Tell Us What You Need",
    text: "Browse products or contact the team with your rollermill, poshomill, spare parts, or fabrication requirement.",
    color: "var(--pembe-purple)",
  },
  {
    n: "02",
    title: "Receive Guidance and Pricing",
    text: "Get a quote, recommendation, and delivery or service guidance through WhatsApp or direct call.",
    color: "var(--pembe-green)",
  },
  {
    n: "03",
    title: "Confirm Your Order or Service",
    text: "Proceed with the selected machine, part, or fabrication request through direct communication and support.",
    color: "var(--pembe-magenta)",
  },
];

export default function ServicesPage() {
  const serviceMessage =
    "Hello " +
    COMPANY.shortName +
    ", I need help with a service or fabrication request.";

  const whatsappLink =
    "https://wa.me/" +
    COMPANY.whatsapp +
    "?text=" +
    encodeURIComponent(serviceMessage);

  return (
    <main>
      <section className="border-b border-[color:var(--border)] bg-gradient-to-b from-white to-[color:var(--soft-2)]">
        <div className="container-shell py-14 md:py-18">
          <p className="section-kicker">Services</p>
          <h1 className="section-title mt-3">
            Rollermill, Poshomill and Fabrication Services
          </h1>
          <p className="max-w-3xl mt-5 text-base md:text-lg text-[color:var(--text-muted)] leading-7">
            {COMPANY.name} provides practical milling machine solutions,
            fabrication support, spare parts assistance, and customer-focused
            service to help businesses operate efficiently.
          </p>
        </div>
      </section>

      <section className="container-shell py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const accents = [
              "var(--pembe-purple)",
              "var(--pembe-green)",
              "var(--pembe-magenta)",
            ];
            const accent = accents[index % accents.length];

            return (
              <div
                key={service.title}
                className="soft-card rounded-[1.5rem] p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="brand-badge inline-block">{service.badge}</div>

                <div
                  className="mt-4 h-2 w-16 rounded-full"
                  style={{ background: accent }}
                />

                <h2 className="text-xl font-semibold mt-5 text-slate-900">
                  {service.title}
                </h2>

                <p className="mt-3 text-sm text-[color:var(--text-muted)] leading-6">
                  {service.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[color:var(--border)] bg-[color:var(--soft-2)]">
        <div className="container-shell py-14">
          <div className="max-w-3xl">
            <p className="section-kicker">How it Works</p>
            <h2 className="section-title mt-2">A Simple Enquiry Process</h2>
            <p className="mt-4 text-[color:var(--text-muted)] leading-7">
              We keep the process direct, practical, and fast so you can get the
              right milling solution with less back and forth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {processSteps.map((item) => (
              <div key={item.n} className="soft-card rounded-[1.5rem] p-6">
                <div
                  className="text-2xl font-semibold"
                  style={{ color: item.color }}
                >
                  {item.n}
                </div>

                <h3 className="font-semibold mt-3 text-slate-900">
                  {item.title}
                </h3>

                <p className="text-sm text-[color:var(--text-muted)] mt-2 leading-6">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-14">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[1.75rem] bg-gradient-to-br from-purple-50 via-white to-green-50 p-8 shadow-sm">
            <p className="section-kicker">Why Choose Us</p>
            <h2 className="text-2xl font-semibold text-[color:var(--pembe-purple)] mt-2">
              Practical Support for Real Milling Operations
            </h2>

            <div className="mt-5 space-y-4 text-sm text-[color:var(--text-muted)] leading-6">
              <p>
                We focus on practical machine supply and support for customers
                who need dependable rollermills, poshomills, spare parts, and
                fabrication guidance.
              </p>
              <p>
                Our approach is simple: understand your need, recommend the
                right solution, and guide you toward the fastest next step.
              </p>
            </div>
          </div>

          <div className="soft-card rounded-[1.75rem] p-8 md:p-10 flex flex-col md:flex-row justify-between gap-6">
            <div className="max-w-2xl">
              <p className="section-kicker">Get Started</p>
              <h2 className="text-2xl font-semibold text-[color:var(--pembe-purple)] mt-2">
                Need a Service Quote or Custom Fabrication Support?
              </h2>
              <p className="text-sm text-[color:var(--text-muted)] mt-3 leading-6">
                Reach out directly to {COMPANY.contactPerson} and explain your
                machine requirement, quantity, or fabrication idea.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ui-button ui-button-green h-fit"
              >
                Request Service Quote
              </a>

              <Link href="/contact" className="ui-button ui-button-light h-fit">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}