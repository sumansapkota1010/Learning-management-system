import { NextRequest } from "next/server";
import { deleteCategory, editCategory } from "../category.controller";

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  return deleteCategory(request, id);
}

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  return editCategory(request, id);
}
