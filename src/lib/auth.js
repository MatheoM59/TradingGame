import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

export const createSession = async (userId) => {
  const token = await new SignJWT({ userId: userId })
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

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("session");
};

export const getUserId = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.userId;
  } catch (error) {
    console.log(error);
    return null;
  }
};
