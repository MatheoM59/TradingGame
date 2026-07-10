import { sql } from '@/lib/db';

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return Response.json({ error: 'Email requis' }, { status: 400 });
    }
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    return Response.json(
      { id: user[0].id, email: user[0].email, username: user[0].username },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
