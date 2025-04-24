import connectDb from "@/database/connection";

export async function GET() {
  connectDb();
  return Response.json({
    message: "You have hit the api route",
  });
}
