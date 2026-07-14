import { sql } from "@/lib/db";
import { getUserId } from "@/lib/auth";

export async function POST() {
  try {
    const userId = await getUserId();
    if (!userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const data = await sql`
        SELECT cl.*, (cl.price <= u.balance) AS affordable
        FROM clicker_levels cl
        JOIN users u ON u.id = ${userId}
        WHERE cl.level > u.clicker_level
        ORDER BY cl.level ASC
    `;
    const buyable = data.filter((l) => l.affordable).at(-1) ?? null;
    const next = data.find((l) => !l.affordable) ?? null;
    return Response.json({ buyable, next }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Network error" }, { status: 500 });
  }
}
