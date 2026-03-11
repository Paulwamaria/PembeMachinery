import { prisma } from "@/lib/prisma";

export async function getPublicProducts(params?: {
    category?: string;
    q?: string;
    featured?: boolean;
}) {
    const where: any = {
        inStock: true,
    };

    if (params?.featured) where.featured = true;

    if (params?.category) {
        where.category = { slug: params.category };
    }

    if (params?.q) {
        where.OR = [
            { name: { contains: params.q, mode: "insensitive" } },
            { summary: { contains: params.q, mode: "insensitive" } },
            { description: { contains: params.q, mode: "insensitive" } },
        ];
    }

    return prisma.product.findMany({
        where,
        include: { category: true },
        orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
    });
}

export async function getPublicProductBySlug(slug: string) {
    return prisma.product.findUnique({
        where: { slug },
        include: { category: true },
    });
}

export async function getPublicCategories() {
    return prisma.category.findMany({
        orderBy: { name: "asc" },
    });
}

export function extractImages(images: unknown): string[] {
    if (Array.isArray(images)) {
        return images.filter((img): img is string => typeof img === "string" && img.length > 0);
    }
    return [];
}

export async function getHeroImages() {
    const products = await prisma.product.findMany({
        where: {
            inStock: true,
            featured: true,
        },
        orderBy: [{ updatedAt: "desc" }],
        take: 4,
        select: {
            id: true,
            name: true,
            slug: true,
            images: true,
        },
    });

    return products.map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: extractImages(product.images)[0] ?? null,
    }));
}