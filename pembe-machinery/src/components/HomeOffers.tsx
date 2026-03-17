import { prisma } from "@/lib/prisma";

export default async function HomeOffers() {
  const offers = await prisma.offer.findMany({
    where: { isActive: true },
    take: 3,
  });

  if (!offers.length) return null;

  return (
    <section className="section-space bg-slate-50">
      <div className="container-shell">
        <h2 className="section-title">Current Offers</h2>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {offers.map((offer) => (
            <div key={offer.id} className="soft-card p-4">
              {offer.badge && (
                <span className="brand-badge">{offer.badge}</span>
              )}
              <h3 className="font-semibold mt-2">{offer.title}</h3>
              <p className="text-sm text-slate-600 mt-2">
                {offer.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}