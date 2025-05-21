import { createCourse } from "./course.controller";

export async function POST(req: Request) {
  return createCourse(req);
}

export async function GET(req: Request) {}
