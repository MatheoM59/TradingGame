import { sql } from "@/lib/db";
import { getUserId } from "@/lib/auth";
export async function POST(request) {
  try {
    const userId = await getUserId();
    const { pending } = await request.json();

    if (!userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!Number.isInteger(pending) || pending < 0) {
      return Response.json({ message: "Invalid balance" }, { status: 400 });
    }
    const NewBalance = await sql`WITH allowed AS (
      SELECT LEAST(
        ${pending},
        20 * EXTRACT(EPOCH FROM (NOW() - last_sync_at)) + 20
      ) AS clics,
        (SELECT click_value
        FROM clicker_levels
        WHERE level = users.clicker_level) AS valeur
      FROM users
      WHERE id = ${userId}
    )
      UPDATE users
      SET balance = balance + (SELECT clics * valeur FROM allowed),
      total_earnings = total_earnings + (SELECT clics * valeur FROM allowed),
      last_sync_at = NOW(),
      updated_at = NOW()
      WHERE id = ${userId}
      RETURNING balance, total_earnings, total_expense;`;
    return Response.json(
      {
        success: true,
        balance: NewBalance[0].balance,
        total_earnings: NewBalance[0].total_earnings,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "Erreur lors de l'update" },
      { status: 500 },
    );
  }
}
