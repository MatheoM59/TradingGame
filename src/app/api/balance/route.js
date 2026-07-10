import { sql } from '@/lib/db';
export async function POST(request) {
  try {
    const { id, balance, total_earnings, total_expense } = await request.json();

    if (!balance || isNaN(balance)) {
      return Response.json({ error: 'Balance invalide' }, { status: 400 });
    }
    const NewBalance =
      await sql`UPDATE users SET balance = ${balance}, total_earnings = ${total_earnings}, total_expense=${total_expense} WHERE id = ${id} RETURNING *`;
    return Response.json(
      { success: true, total_earnings: NewBalance[0].total_earnings },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Erreur lors de l'update" }, { status: 500 });
  }
}
