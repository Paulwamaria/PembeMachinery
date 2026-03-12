import { prisma } from "@/lib/prisma";
import { z } from "zod";

const VideoSchema = z.object({
  title: z.string().min(2),
  caption: z.string().nullable().optional(),
  videoUrl: z.string().min(1),
  videoType: z.enum(["upload", "external"]).optional(),
  platform: z.enum(["direct", "youtube", "facebook", "vimeo"]).optional(),
  thumbnailUrl: z.string().nullable().optional(),
  featured: z.boolean().optional(),
});

export async function GET() {
  const results = await prisma.showcaseVideo.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json({ results });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = VideoSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  const created = await prisma.showcaseVideo.create({
    data: {
      title: parsed.data.title,
      caption: parsed.data.caption ?? null,
      videoUrl: parsed.data.videoUrl,
      videoType: parsed.data.videoType ?? "upload",
      platform: parsed.data.platform ?? "direct",
      thumbnailUrl: parsed.data.thumbnailUrl ?? null,
      featured: parsed.data.featured ?? true,
    },
  });

  return Response.json(created, { status: 201 });
}