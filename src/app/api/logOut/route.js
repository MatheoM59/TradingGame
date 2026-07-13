import { deleteSession } from "@/lib/auth";
export async function POST() {
  try {
    await deleteSession("session");
    return Response.json({ message: "LogOut successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        message: "Network error",
      },
      { status: 500 },
    );
  }
}
