import { singleCourse } from "../course.controller";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  return singleCourse(req, id);
}
