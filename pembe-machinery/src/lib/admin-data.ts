import { prisma } from "@/lib/prisma";

type AdminProductFilters = {
  q?: string | null;
  category?: string | null;
  in_stock?: string | null;
  featured?: string | null;
  sort?: string | null;
};

export async function getAdminProducts(filters: AdminProductFilters) {
  const { q, category, in_stock, featured, sort } = filters;

  const where: any = {};

  if (q?.trim()) {
    const search = q.trim();

    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { slug: { contains: search, mode: "insensitive" } },
      { summary: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (category?.trim()) {
    where.category = {
      slug: category.trim(),
    };
  }

  if (in_stock === "true") {
    where.inStock = true;
  } else if (in_stock === "false") {
    where.inStock = false;
  }

  if (featured === "true") {
    where.featured = true;
  } else if (featured === "false") {
    where.featured = false;
  }

  let orderBy: any = [{ createdAt: "desc" }];

  if (sort === "name_asc") {
    orderBy = [{ name: "asc" }];
  } else if (sort === "name_desc") {
    orderBy = [{ name: "desc" }];
  } else if (sort === "price_asc") {
    orderBy = [{ price: "asc" }];
  } else if (sort === "price_desc") {
    orderBy = [{ price: "desc" }];
  } else if (sort === "featured") {
    orderBy = [{ featured: "desc" }, { createdAt: "desc" }];
  } else if (sort === "oldest") {
    orderBy = [{ createdAt: "asc" }];
  }

  return prisma.product.findMany({
    where,
    include: {
      category: true,
    },
    orderBy,
  });
}

export async function getAdminCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}