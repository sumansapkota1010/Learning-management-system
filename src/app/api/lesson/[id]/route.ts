import { deleteLesson } from "../lesson.controller";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  return deleteLesson(req, id);
}
