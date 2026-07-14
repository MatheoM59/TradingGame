import { sql } from "@/lib/db";
import { getUserId } from "@/lib/auth";
export async function POST() {
  try {
    const userId = await getUserId();
    if (!userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const upgrade = await sql`
        UPDATE users
        SET clicker_level = clicker_level + 1 
        WHERE id = ${userId}
    `;
  } catch (error) {
    console.error(error);
  }
}
