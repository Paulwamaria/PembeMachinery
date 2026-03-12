import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-session";
import { getAutoThumbnail } from "@/lib/video";

export async function GET() {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const results = await prisma.showcaseVideo.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Admin videos GET error:", error);
    return NextResponse.json(
      { error: "Failed to load videos." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const title = String(body.title || "").trim();
    const caption = body.caption ? String(body.caption).trim() : null;
    const videoUrl = String(body.videoUrl || "").trim();
    const videoType = String(body.videoType || "external").trim();
    const platform = String(body.platform || "youtube").trim();
    const featured = Boolean(body.featured);
    const manualThumbnail = body.thumbnailUrl
      ? String(body.thumbnailUrl).trim()
      : null;

    if (!title || !videoUrl) {
      return NextResponse.json(
        { error: "Title and video URL are required." },
        { status: 400 }
      );
    }

    const thumbnailUrl =
      manualThumbnail || getAutoThumbnail(videoUrl, platform) || null;

    const video = await prisma.showcaseVideo.create({
      data: {
        title,
        caption,
        videoUrl,
        videoType,
        platform,
        thumbnailUrl,
        featured,
      },
    });

    return NextResponse.json({ success: true, video });
  } catch (error) {
    console.error("Create video error:", error);
    return NextResponse.json(
      { error: "Failed to create video." },
      { status: 500 }
    );
  }
}