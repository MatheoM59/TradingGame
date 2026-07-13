import { sql } from "@/lib/db";
import { createSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { email, userName, passWord } = await request.json();
    if (!email || !passWord || !userName) {
      return Response.json(
        { message: "Email, Pass Word, Username are required" },
        {
          status: 400,
        },
      );
    }
    if (passWord.length < 8) {
      return Response.json(
        {
          message: "Minimum 8 caracteres for the password",
        },
        { status: 400 },
      );
    }
    const password_hash = await bcrypt.hash(passWord, 10);
    const user =
      await sql`INSERT INTO users (email, username, password_hash, balance, total_earnings, total_expense, created_at, updated_at) VALUES (${email.trim().toLowerCase()}, ${userName.trim().toLowerCase()}, ${password_hash}, 0, 0.00, 0.00, NOW(), NOW()) RETURNING *`;
    createSession(user[0].id);
    return Response.json(
      {
        message: "Connected",
        id: user[0].id,
        email: user[0].email,
        username: user[0].username,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    if (error.code === "23505") {
      console.error("Email already taken");
      return Response.json(
        { message: "Email already taken !" },
        { status: 409 },
      );
    }
    return Response.json(
      { message: "Erreur lors de la création" },
      { status: 500 },
    );
  }
}
