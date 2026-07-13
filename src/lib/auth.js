import { SignJWT } from "jose";
import { cookies } from "next/headers";

export const createSession = async (user) => {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
  const token = await new SignJWT({ userId: user })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
};
