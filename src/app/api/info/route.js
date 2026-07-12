import { sql } from '@/lib/db';

export async function POST(request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return Response.json({ message: 'UserId requis' }, { status: 400 });
    }
    const info =
      await sql`SELECT balance, total_earnings, total_expense FROM users WHERE id = ${id}`;
    return Response.json(
      {
        balance: info[0].balance,
        total_earnings: info[0].total_earnings,
        total_expense: info[0].total_expense,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Not found' }, { status: 401 });
  }
}
