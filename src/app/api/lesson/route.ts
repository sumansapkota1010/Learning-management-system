import { createLesson } from "./lesson.controller";

export async function POST(req: Request) {
  return createLesson(req);
}
