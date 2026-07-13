import { sql } from "@/lib/db";
import { getUserId } from "@/lib/auth";
export async function POST() {
  try {
    const userId = await getUserId();
    if (!userId) {
      return Response.json({ message: "Unauthorized" }, { status: 400 });
    }
    const info =
      await sql`SELECT username,balance, total_earnings, total_expense FROM users WHERE id = ${userId}`;
    return Response.json(
      {
        username: info[0].username,
        balance: info[0].balance,
        total_earnings: info[0].total_earnings,
        total_expense: info[0].total_expense,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Not found" }, { status: 401 });
  }
}
