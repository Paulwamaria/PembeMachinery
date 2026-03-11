import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  summary: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  categoryId: z.string().min(1),
  featured: z.boolean().optional(),
  inStock: z.boolean().optional(),
  images: z.array(z.string().url()).nullable().optional(),
  specs: z.record(z.string(), z.any()).nullable().optional(),

  price: z.union([z.number(), z.null()]).optional(),
  currency: z.string().optional(),
  priceOnRequest: z.boolean().optional(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";

  const products = await prisma.product.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { summary: { contains: q, mode: "insensitive" } },
          ],
        }
      : undefined,
    include: { category: true },
    orderBy: { updatedAt: "desc" },
  });

  return Response.json({ results: products });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = ProductSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: {
      name: parsed.data.name,
      slug: parsed.data.slug,
      summary: parsed.data.summary ?? null,
      description: parsed.data.description ?? null,
      categoryId: parsed.data.categoryId,
      featured: parsed.data.featured ?? false,
      inStock: parsed.data.inStock ?? true,
      images: parsed.data.images ?? null,
      specs: parsed.data.specs ?? null,
      price: parsed.data.price ?? null,
      currency: parsed.data.currency ?? "KES",
      priceOnRequest: parsed.data.priceOnRequest ?? false,
    },
  });

  return Response.json(product, { status: 201 });
}