import { sql } from "@/lib/db";

export async function POST(request) {
  try {
    const { user_id } = await request.json();
    if (!user_id) {
      console.error("User id required");
      return Response.json({ message: "User Id required" }, { status: 400 });
    }
    const items = await sql`
      SELECT i.*, (io.user_id IS NOT NULL)AS owned
      FROM items i 
      LEFT JOIN item_owned io 
        ON io.item_id = i.id AND io.user_id = ${user_id}
      ORDER BY i.price, i.id
    `;
    return Response.json(
      {
        data: items,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Not found" }, { status: 500 });
  }
}
