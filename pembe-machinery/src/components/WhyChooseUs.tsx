export default function WhyChooseUs() {
  const items = [
    {
      title: "Reliable Machinery",
      text: "We focus on practical, durable machines suitable for daily production and agricultural use.",
    },
    {
      title: "Fast Quote Requests",
      text: "Customers can request pricing instantly through WhatsApp for a faster and simpler process.",
    },
    {
      title: "Fabrication Support",
      text: "Beyond ready-made products, we can support custom fabrication and machine-related requirements.",
    },
    {
      title: "Customer-Focused Service",
      text: "From enquiry to delivery, the experience is designed to be clear, direct, and easy to follow.",
    },
  ];

  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="max-w-2xl">
          <p className="section-kicker">Why Pembe</p>
          <h2 className="section-title mt-2">
            Built for Trust, Enquiries, and Conversion
          </h2>
          <p className="mt-4 text-sm md:text-base text-gray-600 leading-7">
            The website experience is designed to help customers discover products
            faster and contact your team with less friction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {items.map((item) => (
            <div key={item.title} className="soft-card p-6">
              <div className="h-11 w-11 rounded-2xl bg-gray-100 border border-gray-200" />
              <h3 className="mt-4 font-semibold text-lg">{item.title}</h3>
              <p className="mt-3 text-sm text-gray-600 leading-6">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}