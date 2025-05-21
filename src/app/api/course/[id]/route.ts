import { deleteCourse, editCourse, singleCourse } from "../course.controller";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  return singleCourse(req, id);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  return deleteCourse(req, id);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  return editCourse(req, id);
}
