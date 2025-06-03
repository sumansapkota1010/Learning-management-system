import { NextRequest, NextResponse } from "next/server";
import { deleteCategory, editCategory } from "../category.controller";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> {
  return deleteCategory(req, context.params.id);
}
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  return editCategory(request, id);
}
