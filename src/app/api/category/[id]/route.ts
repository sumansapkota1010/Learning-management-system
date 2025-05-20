import { deleteCategory } from "../category.controller";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  return deleteCategory(id);
}
