import Link from "next/link";
import { getGalleryImages } from "@/lib/public-data";

export default async function ProjectsPage() {
  const projects = await getGalleryImages(6);

  return (
    <main>
      <section className="border-b border-[color:var(--border)] bg-gradient-to-b from-white to-[color:var(--soft-2)]">
        <div className="container-shell py-14 md:py-18">
          <p className="section-kicker">Projects</p>
          <h1 className="section-title mt-3">
            Project and Work Showcase
          </h1>
          <p className="max-w-3xl mt-5 text-base md:text-lg text-[color:var(--text-muted)] leading-7">
            A visual overview of the machinery, fabrication, and support work
            Pembe Machinery can present to customers.
          </p>
        </div>
      </section>

      <section className="container-shell py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length ? (
            projects.map((project) => (
              <Link
                key={project.id}
                href={`/products/${project.slug}`}
                className="soft-card overflow-hidden hover:shadow-md transition"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image!}
                    alt={project.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="text-xs uppercase tracking-wide font-medium text-[color:var(--pembe-green)]">
                    {project.category?.name ?? "Machinery"}
                  </div>
                  <h2 className="text-xl font-semibold mt-2 text-slate-900">
                    {project.name}
                  </h2>
                  <p className="text-sm text-[color:var(--text-muted)] mt-3 leading-6">
                    View this machinery item and request a quotation directly.
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-sm text-[color:var(--text-muted)]">
              No project images available yet.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}