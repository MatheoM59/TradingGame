import { sql } from '@/lib/db';
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const { balance } = await request.json();
    if (!balance || isNaN(balance)) {
      return Response.json({ error: 'Balance invalide' }, { status: 400 });
    }
    const NewBalance =
      await sql`UPDATE users SET balance = ${balance} WHERE id = ${id} RETURNING *`;
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Erreur lors de l'update" }, { status: 500 });
  }
}
