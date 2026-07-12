import { sql } from "@/lib/db";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    if (!email || !password) {
      return Response.json(
        { message: "Email and password required !" },
        { status: 400 },
      );
    }

    const user =
      await sql`SELECT id, email, username, password_hash FROM users WHERE email = ${email.trim().toLowerCase()}`;
    if (user.length === 0) {
      return Response.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }
    const valid = await bcrypt.compare(password, user[0].password_hash);
    if (!valid) {
      return Response.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    const token = await new SignJWT({ userId: user[0].id })
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

    return Response.json(
      {
        message: "Connected",
        id: user[0].id,
        email: user[0].email,
        username: user[0].username,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
