import { prisma } from "@/lib/prisma";
import { z } from "zod";

const UpdateSchema = z.object({
  name: z.string().min(2).optional(),
  slug: z.string().min(2).optional(),
  summary: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  categoryId: z.string().min(1).optional(),
  featured: z.boolean().optional(),
  inStock: z.boolean().optional(),
  images: z.array(z.string().url()).nullable().optional(),
  specs: z.record(z.string(), z.any()).nullable().optional(),

  price: z.union([z.number(), z.null()]).optional(),
  currency: z.string().optional(),
  priceOnRequest: z.boolean().optional(),
});

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    return new Response("Not found", { status: 404 });
  }

  return Response.json(product);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = UpdateSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  const updated = await prisma.product.update({
    where: { id },
    data: {
      ...parsed.data,
      price: parsed.data.price ?? null,
      currency: parsed.data.currency ?? "KES",
      priceOnRequest: parsed.data.priceOnRequest ?? false,
    },
  });

  return Response.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.product.delete({
    where: { id },
  });

  return Response.json({ ok: true });
}