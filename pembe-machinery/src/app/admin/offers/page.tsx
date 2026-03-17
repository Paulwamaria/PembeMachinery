import { prisma } from "@/lib/prisma";

export default async function OffersPage() {
  const offers = await prisma.offer.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold">Offers</h1>

      {offers.map((offer) => (
        <div key={offer.id} className="soft-card p-4 mt-4">
          <h3 className="font-semibold">{offer.title}</h3>
          <p className="text-sm text-slate-600">{offer.description}</p>
        </div>
      ))}
    </div>
  );
}