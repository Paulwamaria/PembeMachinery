const projects = [
  {
    title: "Posho Mill Supply Project",
    category: "Machinery Supply",
    text: "Supply and setup support for milling equipment intended for commercial processing operations.",
  },
  {
    title: "Maize Shelling Solution",
    category: "Agricultural Equipment",
    text: "Provision of maize shelling machinery designed to improve efficiency for farm and bulk handling use cases.",
  },
  {
    title: "Custom Fabrication Work",
    category: "Fabrication",
    text: "Fabrication-based work tailored to machine structures, metal modifications, and workshop requirements.",
  },
  {
    title: "Spare Parts Fulfilment",
    category: "Support & Maintenance",
    text: "Supply of replacement parts to help restore and maintain operational machinery performance.",
  },
  {
    title: "Mixer Equipment Delivery",
    category: "Processing Equipment",
    text: "Support for sourcing and dispatching mixer machinery suitable for production environments.",
  },
  {
    title: "Workshop Machinery Support",
    category: "Industrial Solutions",
    text: "General support across commercial workshop machinery and fabrication-related equipment needs.",
  },
];

export default function ProjectsPage() {
  return (
    <main>
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-14 md:py-18">
          <p className="text-sm uppercase tracking-wide opacity-60">Projects</p>
          <h1 className="text-4xl md:text-5xl font-semibold mt-3">
            Project and Work Showcase
          </h1>
          <p className="max-w-3xl mt-5 text-base md:text-lg opacity-75 leading-7">
            A modern overview of the kinds of machinery supply, fabrication, and
            support work Pembe Machinery can present to customers.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={`${project.title}-${index}`} className="rounded-2xl border overflow-hidden">
              <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center text-sm opacity-60">
                Project Image Placeholder
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-wide opacity-60">
                  {project.category}
                </div>
                <h2 className="text-xl font-semibold mt-2">{project.title}</h2>
                <p className="text-sm opacity-75 mt-3 leading-6">{project.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 border-y">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-wide opacity-60">Presentation Value</p>
            <h2 className="text-3xl font-semibold mt-2">
              Why a Projects Page Matters
            </h2>
            <p className="text-sm opacity-75 mt-4 leading-7">
              A strong projects section helps customers trust the brand, understand
              the type of work handled, and visualize the practical business value
              of the machinery and fabrication services being offered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="rounded-2xl border bg-white p-6">
              <h3 className="font-semibold">Builds Credibility</h3>
              <p className="text-sm opacity-75 mt-3 leading-6">
                Customers want evidence of real capability and delivery experience.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6">
              <h3 className="font-semibold">Supports Sales</h3>
              <p className="text-sm opacity-75 mt-3 leading-6">
                Showcasing relevant work makes it easier for clients to inquire with confidence.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6">
              <h3 className="font-semibold">Improves Brand Positioning</h3>
              <p className="text-sm opacity-75 mt-3 leading-6">
                It helps present Pembe Machinery as an active, capable, modern provider.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="rounded-3xl border p-8 md:p-10 flex flex-col md:flex-row justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold">
              Want to discuss a similar project or machine requirement?
            </h2>
            <p className="text-sm opacity-75 mt-3 leading-6">
              Send a quick WhatsApp message and describe what you need.
            </p>
          </div>

          <a
            href="https://wa.me/254721772520?text=Hello%20Pembe%20Machinery,%20I%20would%20like%20to%20discuss%20a%20project%20or%20machine%20requirement."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-xl bg-black text-white px-5 py-3 font-medium h-fit"
          >
            Start a Project Enquiry
          </a>
        </div>
      </section>
    </main>
  );
}