import { deleteLesson, fetchLesson } from "../lesson.controller";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  return deleteLesson(req, id);
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  return fetchLesson(req, id);
}
