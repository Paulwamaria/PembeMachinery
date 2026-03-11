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
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-14 md:py-18">
          <p className="text-sm uppercase tracking-wide opacity-60">Services</p>
          <h1 className="text-4xl md:text-5xl font-semibold mt-3">
            Machinery and Fabrication Services
          </h1>
          <p className="max-w-3xl mt-5 text-base md:text-lg opacity-75 leading-7">
            Pembe Machinery offers practical machinery solutions, fabrication support,
            spare parts assistance, and customer-focused service to help businesses
            operate efficiently.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.title} className="rounded-2xl border p-6">
              <h2 className="text-xl font-semibold">{service.title}</h2>
              <p className="mt-3 text-sm opacity-75 leading-6">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 border-y">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-wide opacity-60">How it Works</p>
            <h2 className="text-3xl font-semibold mt-2">
              A Simple Enquiry Process
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="rounded-2xl border bg-white p-6">
              <div className="text-2xl font-semibold">01</div>
              <h3 className="font-semibold mt-3">Browse or Explain Your Need</h3>
              <p className="text-sm opacity-75 mt-2 leading-6">
                View products online or contact the team with your machinery or fabrication requirement.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6">
              <div className="text-2xl font-semibold">02</div>
              <h3 className="font-semibold mt-3">Receive Guidance and Pricing</h3>
              <p className="text-sm opacity-75 mt-2 leading-6">
                Get a quote, product recommendation, and delivery or service guidance through WhatsApp or call.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6">
              <div className="text-2xl font-semibold">03</div>
              <h3 className="font-semibold mt-3">Confirm Order or Service</h3>
              <p className="text-sm opacity-75 mt-2 leading-6">
                Proceed with the selected machinery, spare part, or fabrication service with direct communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="rounded-3xl border p-8 md:p-10 flex flex-col md:flex-row justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold">
              Need a service quote or custom fabrication support?
            </h2>
            <p className="text-sm opacity-75 mt-3 leading-6">
              Reach out directly and explain your machine requirement, quantity, or fabrication idea.
            </p>
          </div>

          <a
            href="https://wa.me/254721772520?text=Hello%20Pembe%20Machinery,%20I%20need%20help%20with%20a%20service%20or%20fabrication%20request."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-xl bg-black text-white px-5 py-3 font-medium h-fit"
          >
            Request Service Quote
          </a>
        </div>
      </section>
    </main>
  );
}