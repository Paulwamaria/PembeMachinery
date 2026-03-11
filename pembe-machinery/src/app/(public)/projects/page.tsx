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
      <section className="border-b border-[color:var(--border)] bg-gradient-to-b from-white to-[color:var(--soft-2)]">
        <div className="container-shell py-14 md:py-18">
          <p className="section-kicker">Projects</p>
          <h1 className="section-title mt-3">
            Project and Work Showcase
          </h1>
          <p className="max-w-3xl mt-5 text-base md:text-lg text-[color:var(--text-muted)] leading-7">
            A modern overview of the kinds of machinery supply, fabrication, and
            support work Pembe Machinery can present to customers.
          </p>
        </div>
      </section>

      <section className="container-shell py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const colors = [
              "var(--pembe-purple)",
              "var(--pembe-green)",
              "var(--pembe-magenta)",
            ];
            const color = colors[index % colors.length];

            return (
              <div key={`${project.title}-${index}`} className="soft-card overflow-hidden">
                <div
                  className="aspect-[4/3] flex items-center justify-center text-sm text-white font-medium"
                  style={{ background: `linear-gradient(135deg, ${color}, rgba(15,23,42,0.78))` }}
                >
                  Project Showcase
                </div>
                <div className="p-5">
                  <div
                    className="text-xs uppercase tracking-wide font-medium"
                    style={{ color }}
                  >
                    {project.category}
                  </div>
                  <h2 className="text-xl font-semibold mt-2 text-slate-900">
                    {project.title}
                  </h2>
                  <p className="text-sm text-[color:var(--text-muted)] mt-3 leading-6">
                    {project.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[color:var(--border)] bg-[color:var(--soft-2)]">
        <div className="container-shell py-14">
          <div className="max-w-3xl">
            <p className="section-kicker">Presentation Value</p>
            <h2 className="section-title mt-2">
              Why a Projects Page Matters
            </h2>
            <p className="text-sm text-[color:var(--text-muted)] mt-4 leading-7">
              A strong projects section helps customers trust the brand, understand
              the type of work handled, and visualize the practical business value
              of the machinery and fabrication services being offered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              {
                title: "Builds Credibility",
                text: "Customers want evidence of real capability and delivery experience.",
                color: "var(--pembe-purple)",
              },
              {
                title: "Supports Sales",
                text: "Showcasing relevant work makes it easier for clients to inquire with confidence.",
                color: "var(--pembe-green)",
              },
              {
                title: "Improves Brand Positioning",
                text: "It helps present Pembe Machinery as an active, capable, modern provider.",
                color: "var(--pembe-magenta)",
              },
            ].map((item) => (
              <div key={item.title} className="soft-card p-6">
                <div
                  className="h-2 w-16 rounded-full"
                  style={{ background: item.color }}
                />
                <h3 className="font-semibold mt-4 text-slate-900">{item.title}</h3>
                <p className="text-sm text-[color:var(--text-muted)] mt-3 leading-6">
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
              Want to discuss a similar project or machine requirement?
            </h2>
            <p className="text-sm text-[color:var(--text-muted)] mt-3 leading-6">
              Send a quick WhatsApp message and describe what you need.
            </p>
          </div>

          <a
            href="https://wa.me/254721772520?text=Hello%20Pembe%20Machinery,%20I%20would%20like%20to%20discuss%20a%20project%20or%20machine%20requirement."
            target="_blank"
            rel="noopener noreferrer"
            className="ui-button ui-button-green h-fit"
          >
            Start a Project Enquiry
          </a>
        </div>
      </section>
    </main>
  );
}
