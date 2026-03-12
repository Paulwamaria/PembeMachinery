import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const fullName = String(body.fullName || "").trim();
        const phone = String(body.phone || "").trim();
        const email = body.email ? String(body.email).trim() : null;
        const company = body.company ? String(body.company).trim() : null;
        const message = body.message ? String(body.message).trim() : null;
        const productId =
            body.productId !== undefined && body.productId !== null
                ? String(body.productId).trim()
                : null;

        if (!fullName || !phone) {
            return NextResponse.json(
                { error: "Full name and phone are required." },
                { status: 400 }
            );
        }

   
        const inquiry = await prisma.inquiry.create({
            data: {
                fullName,
                phone,
                email,
                company,
                message,
                productId: productId || null,
            },
        });

        return NextResponse.json({
            success: true,
            inquiry,
        });
    } catch (error) {
        console.error("Inquiry create error:", error);
        return NextResponse.json(
            { error: "Failed to submit inquiry." },
            { status: 500 }
        );
    }
}