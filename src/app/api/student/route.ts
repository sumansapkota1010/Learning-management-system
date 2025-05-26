import { fetchStudent } from "./student.controller";

export async function GET(req: Request) {
  return fetchStudent(req);
}
