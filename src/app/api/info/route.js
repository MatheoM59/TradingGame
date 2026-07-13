import { sql } from "@/lib/db";
import { getUserId } from "@/lib/auth";
export async function POST() {
  try {
    const userId = await getUserId();
    if (!userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const info = await sql`
      SELECT u.username, u.balance, u.total_earnings, u.total_expense,
             cl.click_value
      FROM users u
      JOIN clicker_levels cl ON cl.level = u.clicker_level
      WHERE u.id = ${userId}`;
    return Response.json(
      {
        username: info[0].username,
        balance: info[0].balance,
        total_earnings: info[0].total_earnings,
        total_expense: info[0].total_expense,
        click_value: info[0].click_value,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
