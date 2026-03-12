import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-session";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const images = Array.isArray(body.images)
      ? body.images.filter((item: unknown) => typeof item === "string" && item.trim().length > 0)
      : null;

    if (!images) {
      return NextResponse.json({ error: "Invalid images payload." }, { status: 400 });
    }

    await prisma.product.update({
      where: { id },
      data: { images },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Product images update error:", error);
    return NextResponse.json({ error: "Failed to update images." }, { status: 500 });
  }
}