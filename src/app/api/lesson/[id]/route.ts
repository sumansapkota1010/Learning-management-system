import { deleteLesson, fetchLesson } from "../lesson.controller";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  return deleteLesson(req, id);
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  return fetchLesson(req, id);
}
