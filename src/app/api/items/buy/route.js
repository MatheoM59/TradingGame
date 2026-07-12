import { sql } from "@/lib/db";

export async function POST(request) {
  try {
    const { itemId, userId } = await request.json();
    if (!itemId || !userId) {
      console.error("Item id et user id requis");
      return Response.json(
        { message: "item id & user id required" },
        { status: 400 },
      );
    }
    const buy = await sql`WITH item AS(
    SELECT price FROM items WHERE id = ${itemId}
    ), debit AS(
    UPDATE users 
    SET balance = balance - (SELECT price FROM item),
     total_expense = total_expense + (SELECT price FROM item)
    WHERE id = ${userId}
    AND balance >=(SELECT price FROM item)
    RETURNING id, balance, total_expense
    )
    INSERT INTO item_owned (user_id, item_id)
    SELECT id, ${itemId} FROM debit
    RETURNING (SELECT balance FROM debit) AS balance,
    (SELECT total_expense FROM debit) AS total_expense;
    `;
    if (buy.length === 0) {
      const [check] = await sql`SELECT
      (SELECT price FROM items WHERE id = ${itemId}) AS price,
      (SELECT balance FROM users WHERE id = ${userId}) AS balance`;

      if (check.price === null) {
        return Response.json({ message: "Item not found" }, { status: 404 });
      }
      if (check.balance === null) {
        return Response.json({ message: "User not found" }, { status: 404 });
      }
      return Response.json({ message: "Insufficient funds" }, { status: 400 });
    }
    return Response.json(
      {
        message: "Purchase completed",
        balance: buy[0].balance,
        total_expense: buy[0].total_expense,
      },
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
