import { fetchMyEnrollments } from "../enrollment.controller";

export async function GET(req: Request) {
  return fetchMyEnrollments(req);
}
