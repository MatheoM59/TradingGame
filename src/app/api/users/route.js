import { sql } from '@/lib/db';

export async function POST(request) {
  try {
    const { email, userName } = await request.json();

    if (!email || !userName) {
      return Response.json(
        { error: 'Email et Username requis' },
        {
          status: 400,
        }
      );
    }
    const user =
      await sql`INSERT INTO users (email, username, balance, total_earnings, created_at, updated_at) VALUES (${email}, ${userName}, 0, 0.00, NOW(), NOW()) RETURNING *`;
    return Response.json(
      { id: user[0].id, email: user[0].email, username: user[0].username },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: 'Erreur lors de la création' },
      { status: 500 }
    );
  }
}
