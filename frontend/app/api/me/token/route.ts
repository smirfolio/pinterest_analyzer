import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const dynamic = "force-dynamic";

/**
 * Returns the raw NextAuth JWT (signed with NEXTAUTH_SECRET) so the client
 * can forward it to the FastAPI backend as `Authorization: Bearer <token>`.
 *
 * For the POC skeleton, the same secret is used by FastAPI's `get_optional_user`.
 */
export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? "dev-nextauth-secret-change-me",
    raw: true,
  });
  if (!token) {
    return NextResponse.json({ token: null }, { status: 401 });
  }
  return NextResponse.json({ token });
}