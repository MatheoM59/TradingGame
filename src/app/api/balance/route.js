import { sql } from "@/lib/db";
import { getUserId } from "@/lib/auth";
export async function POST(request) {
  try {
    const userId = await getUserId();
    const { balance, total_earnings, total_expense } = await request.json();

    if (!balance || isNaN(balance)) {
      return Response.json({ message: "Balance invalide" }, { status: 400 });
    }
    const NewBalance =
      await sql`UPDATE users SET balance = ${balance}, total_earnings = ${total_earnings}, total_expense=${total_expense} WHERE id = ${userId} RETURNING *`;
    return Response.json(
      { success: true, total_earnings: NewBalance[0].total_earnings },
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
