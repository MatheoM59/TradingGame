import { sql } from '@/lib/db';

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return Response.json({ error: 'Email requis' }, { status: 400 });
    }
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    return Response.json(user[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
