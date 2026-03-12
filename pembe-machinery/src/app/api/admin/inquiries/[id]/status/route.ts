import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-session";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    const { id } = await params;
    const inquiryId = Number(id);

    if (Number.isNaN(inquiryId)) {
      return NextResponse.json({ error: "Invalid inquiry ID." }, { status: 400 });
    }

    const formData = await req.formData();
    const status = String(formData.get("status") || "").trim();

    if (!["new", "contacted", "closed"].includes(status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    await prisma.inquiry.update({
      where: { id: inquiryId },
      data: { status },
    });

    return NextResponse.redirect(new URL("/admin/inquiries", req.url));
  } catch (error) {
    console.error("Inquiry status update error:", error);
    return NextResponse.json(
      { error: "Failed to update inquiry." },
      { status: 500 }
    );
  }
}