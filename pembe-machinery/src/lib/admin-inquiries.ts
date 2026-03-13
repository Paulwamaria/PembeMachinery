import { prisma } from "@/lib/prisma";

type InquiryFilters = {
  q?: string | null;
  status?: string | null;
};

export async function getAdminInquiries(filters: InquiryFilters) {
  const where: any = {};

  if (filters.q?.trim()) {
    const search = filters.q.trim();

    where.OR = [
      { fullName: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { company: { contains: search, mode: "insensitive" } },
      { message: { contains: search, mode: "insensitive" } },
      {
        product: {
          is: {
            name: { contains: search, mode: "insensitive" },
          },
        },
      },
    ];
  }

  if (filters.status?.trim()) {
    where.status = filters.status.trim();
  }

  return prisma.inquiry.findMany({
    where,
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getInquiryStats() {
  const [total, fresh, contacted, closed] = await Promise.all([
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: "new" } }),
    prisma.inquiry.count({ where: { status: "contacted" } }),
    prisma.inquiry.count({ where: { status: "closed" } }),
  ]);

  return { total, fresh, contacted, closed };
}