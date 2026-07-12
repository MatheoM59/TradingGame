import { sql } from "@/lib/db";

export async function POST(request) {
  try {
    const { itemId, userId } = await request.json();
    if (!itemId) {
      console.error("Item id requis");
      return Response.json({ message: "item id requis" }, { status: 400 });
    }
    const buy = await sql`WITH item AS(
    SELECT price FROM items WHERE id = ${itemId}
    ), debit AS(
    UPDATE users 
    SET balance = balance - (SELECT price FROM item)
    WHERE id = ${userId}
    AND balance >=(SELECT price FROM item)
    RETURNING id, balance
    )
    INSERT INTO item_owned (user_id, item_id)
    SELECT id, ${itemId} FROM debit
    RETURNING (SELECT balance FROM debit) AS balance;
    `;
    if (buy.length === 0) {
      return Response.json(
        {
          message: "Insufficient funds",
        },
        {
          status: 400,
        },
      );
    }
    return Response.json(
      { message: "Purchase completed", balance: buy[0].balance },
      { status: 200 },
    );
  } catch (error) {
    if (error.code === "23505") {
      return Response.json({ message: "Item already owned" }, { status: 409 });
    }
    console.log(error);
    return Response.json({ message: "Error Server" }, { status: 500 });
  }
}
