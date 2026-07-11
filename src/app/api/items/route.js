import { sql } from '@/lib/db';

export async function POST(request) {
  try {
    const items = await sql`SELECT * FROM items`;
    return Response.json(
      {
        // data: items,
        id: items[0].id,
        name: items[0].name,
        price: items[0].price,
        description: items[0].description,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json({ error: 'Not found' }, { status: 401 });
  }
}
