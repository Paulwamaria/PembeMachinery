import { prisma } from "@/lib/prisma";
import { z } from "zod";

const CategorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
});

export async function GET() {
  const results = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return Response.json({ results });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = CategorySchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Invalid input" }, { status: 400 });

  const created = await prisma.category.create({ data: parsed.data });
  return Response.json(created, { status: 201 });
}