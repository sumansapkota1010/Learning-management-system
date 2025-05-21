import { createLesson, fetchLesson } from "./lesson.controller";

export async function POST(req: Request) {
  return createLesson(req);
}

export async function GET(req: Request) {
  return fetchLesson(req);
}
