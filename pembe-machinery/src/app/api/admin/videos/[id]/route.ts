import { prisma } from "@/lib/prisma";
import { z } from "zod";

const UpdateSchema = z.object({
  title: z.string().min(2).optional(),
  caption: z.string().nullable().optional(),
  videoUrl: z.string().min(1).optional(),
  videoType: z.enum(["upload", "external"]).optional(),
  platform: z.enum(["direct", "youtube", "facebook", "vimeo"]).optional(),
  thumbnailUrl: z.string().nullable().optional(),
  featured: z.boolean().optional(),
});

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

  const updated = await prisma.showcaseVideo.update({
    where: { id },
    data: parsed.data,
  });

  return Response.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.showcaseVideo.delete({
    where: { id },
  });

  return Response.json({ ok: true });
}