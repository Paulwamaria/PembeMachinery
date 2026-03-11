import "server-only";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("Missing JWT_SECRET");
}

const secret = new TextEncoder().encode(jwtSecret);

export async function getAdminSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) return null;

    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "ADMIN") return null;

    return {
      userId: payload.userId as string,
      email: payload.email as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}