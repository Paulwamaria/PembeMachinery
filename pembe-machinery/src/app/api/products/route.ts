import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q");
  const featured = searchParams.get("featured");
  const inStock = searchParams.get("in_stock");

  const where: any = {};

  if (category) where.category = { slug: category };
  if (q) where.OR = [{ name: { contains: q, mode: "insensitive" } }, { summary: { contains: q, mode: "insensitive" } }];
  if (featured === "true") where.featured = true;
  if (inStock === "true") where.inStock = true;

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return Response.json({ results: products });
}