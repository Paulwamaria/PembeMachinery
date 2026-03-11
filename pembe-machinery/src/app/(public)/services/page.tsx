const services = [
  {
    title: "Machinery Supply",
    text: "Supply of reliable agricultural and processing machinery for small businesses, workshops, and large-scale operations.",
  },
  {
    title: "Custom Fabrication",
    text: "Fabrication services tailored to specific machinery and metalwork needs for commercial and industrial use.",
  },
  {
    title: "Spare Parts Support",
    text: "Access to essential spare parts and replacement components to keep machines running efficiently.",
  },
  {
    title: "Machine Consultation",
    text: "Guidance on selecting the right machinery based on production goals, workload, and operating environment.",
  },
  {
    title: "Maintenance Support",
    text: "Assistance with servicing, basic machine upkeep, and maintenance recommendations.",
  },
  {
    title: "Delivery Coordination",
    text: "Support for product dispatch and delivery planning to customers across different locations.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <section className="border-b border-[color:var(--border)] bg-gradient-to-b from-white to-[color:var(--soft-2)]">
        <div className="container-shell py-14 md:py-18">
          <p className="section-kicker">Services</p>
          <h1 className="section-title mt-3">
            Machinery and Fabrication Services
          </h1>
          <p className="max-w-3xl mt-5 text-base md:text-lg text-[color:var(--text-muted)] leading-7">
            Pembe Machinery offers practical machinery solutions, fabrication support,
            spare parts assistance, and customer-focused service to help businesses
            operate efficiently.
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
              <div key={service.title} className="soft-card p-6">
                <div
                  className="h-2 w-16 rounded-full"
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
            <h2 className="section-title mt-2">
              A Simple Enquiry Process
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              {
                n: "01",
                title: "Browse or Explain Your Need",
                text: "View products online or contact the team with your machinery or fabrication requirement.",
                color: "var(--pembe-purple)",
              },
              {
                n: "02",
                title: "Receive Guidance and Pricing",
                text: "Get a quote, product recommendation, and delivery or service guidance through WhatsApp or call.",
                color: "var(--pembe-green)",
              },
              {
                n: "03",
                title: "Confirm Order or Service",
                text: "Proceed with the selected machinery, spare part, or fabrication service with direct communication.",
                color: "var(--pembe-magenta)",
              },
            ].map((item) => (
              <div key={item.n} className="soft-card p-6">
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
        <div className="soft-card p-8 md:p-10 flex flex-col md:flex-row justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-[color:var(--pembe-purple)]">
              Need a service quote or custom fabrication support?
            </h2>
            <p className="text-sm text-[color:var(--text-muted)] mt-3 leading-6">
              Reach out directly and explain your machine requirement, quantity, or fabrication idea.
            </p>
          </div>

          <a
            href="https://wa.me/254721772520?text=Hello%20Pembe%20Machinery,%20I%20need%20help%20with%20a%20service%20or%20fabrication%20request."
            target="_blank"
            rel="noopener noreferrer"
            className="ui-button ui-button-green h-fit"
          >
            Request Service Quote
          </a>
        </div>
      </section>
    </main>
  );
}
