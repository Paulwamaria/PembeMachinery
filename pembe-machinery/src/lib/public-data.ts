import { prisma } from "@/lib/prisma";

type ProductFilters = {
  q?: string | null;
  category?: string | null;
  in_stock?: string | null;
  featured?: string | null;
  min_price?: string | null;
  max_price?: string | null;
  sort?: string | null;
};

export async function getPublicProducts(options?: {
  featured?: string | boolean | null;
  category?: string | null;
  in_stock?: string | boolean | null;
  q?: string | null;
  limit?: number | null;
}) {
  const where: any = {};

  if (options?.featured === true || options?.featured === "true") {
    where.featured = true;
  }

  if (options?.in_stock === true || options?.in_stock === "true") {
    where.inStock = true;
  }

  if (options?.category?.trim()) {
    where.category = {
      slug: options.category.trim(),
    };
  }

  if (options?.q?.trim()) {
    const search = options.q.trim();
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { summary: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  return prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    ...(options?.limit ? { take: options.limit } : {}),
  });
}

export async function getFilteredProducts(filters: ProductFilters) {
  const {
    q,
    category,
    in_stock,
    featured,
    min_price,
    max_price,
    sort,
  } = filters;

  const where: any = {};

  if (q?.trim()) {
    const search = q.trim();
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { summary: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (category?.trim()) {
    where.category = { slug: category.trim() };
  }

  if (in_stock === "true") {
    where.inStock = true;
  }

  if (featured === "true") {
    where.featured = true;
  }

  const min = min_price ? Number(min_price) : null;
  const max = max_price ? Number(max_price) : null;

  if (
    (min_price && !Number.isNaN(min)) ||
    (max_price && !Number.isNaN(max))
  ) {
    where.price = {};
    if (min_price && !Number.isNaN(min)) where.price.gte = min;
    if (max_price && !Number.isNaN(max)) where.price.lte = max;
  }

  let orderBy: any = { createdAt: "desc" };

  if (sort === "price_asc") {
    orderBy = { price: "asc" };
  } else if (sort === "price_desc") {
    orderBy = { price: "desc" };
  } else if (sort === "name_asc") {
    orderBy = { name: "asc" };
  } else if (sort === "featured") {
    orderBy = [{ featured: "desc" }, { createdAt: "desc" }];
  } else if (sort === "oldest") {
    orderBy = { createdAt: "asc" };
  }

  return prisma.product.findMany({
    where,
    include: { category: true },
    orderBy,
  });
}

export async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getGalleryImages(limit = 4) {
  const products = await prisma.product.findMany({
    where: {
      images: {
        not: null,
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: Math.max(limit * 2, limit),
  });

  return products
    .map((product) => {
      const images = Array.isArray(product.images) ? product.images : [];
      const firstImage =
        images.find((img) => typeof img === "string" && img.trim().length > 0) ||
        null;

      if (!firstImage) return null;

      return {
        id: product.id,
        slug: product.slug,
        image: firstImage,
        name: product.name,
        category: product.category,
      };
    })
    .filter(Boolean)
    .slice(0, limit) as Array<{
      id: string;
      slug: string;
      image: string;
      name: string;
      category: { name: string } | null;
    }>;
} export async function getHeroImages(limit = 6) {
  const featuredProducts = await prisma.product.findMany({
    where: {
      images: { not: null },
      featured: true,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: Math.max(limit * 2, limit),
  });

  const mappedFeatured = featuredProducts
    .map((product) => {
      const images = Array.isArray(product.images) ? product.images : [];
      const firstImage =
        images.find((img) => typeof img === "string" && img.trim().length > 0) ||
        null;

      if (!firstImage) return null;

      return {
        id: product.id,
        slug: product.slug,
        image: firstImage,
        name: product.name,
        category: product.category,
      };
    })
    .filter(Boolean);

  if (mappedFeatured.length >= limit) {
    return mappedFeatured.slice(0, limit) as Array<{
      id: string;
      slug: string;
      image: string;
      name: string;
      category: { name: string } | null;
    }>;
  }

  const fallbackProducts = await prisma.product.findMany({
    where: {
      images: { not: null },
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: Math.max(limit * 2, limit),
  });

  return fallbackProducts
    .map((product) => {
      const images = Array.isArray(product.images) ? product.images : [];
      const firstImage =
        images.find((img) => typeof img === "string" && img.trim().length > 0) ||
        null;

      if (!firstImage) return null;

      return {
        id: product.id,
        slug: product.slug,
        image: firstImage,
        name: product.name,
        category: product.category,
      };
    })
    .filter(Boolean)
    .slice(0, limit) as Array<{
      id: string;
      slug: string;
      image: string;
      name: string;
      category: { name: string } | null;
    }>;
}