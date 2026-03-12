import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-session";

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const videos = await prisma.showcaseVideo.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({
      results: videos,
    });
  } catch (error) {
    console.error("Admin videos GET error:", error);

    return NextResponse.json(
      { error: "Failed to load videos" },
      { status: 500 }
    );
  }
}