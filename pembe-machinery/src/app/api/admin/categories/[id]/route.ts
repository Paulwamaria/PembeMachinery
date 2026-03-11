import { prisma } from "@/lib/prisma";
import { z } from "zod";

const UpdateSchema = z.object({
  name: z.string().min(2).optional(),
  slug: z.string().min(2).optional(),
});

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json().catch(() => null);
  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Invalid input" }, { status: 400 });

  const updated = await prisma.category.update({
    where: { id: params.id },
    data: parsed.data,
  });

  return Response.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  // If category has products, this will error due to FK—good safety.
  await prisma.category.delete({ where: { id: params.id } });
  return Response.json({ ok: true });
}