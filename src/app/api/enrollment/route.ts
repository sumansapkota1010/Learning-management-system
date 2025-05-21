import { enrollCourse, fetchEnrollments } from "./enrollment.controller";

export async function POST(req: Request) {
  return enrollCourse(req);
}

export async function GET(req: Request) {
  return fetchEnrollments(req);
}
