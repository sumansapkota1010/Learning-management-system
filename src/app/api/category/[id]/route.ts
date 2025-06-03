import { NextRequest, NextResponse } from "next/server";
import { deleteCategory, editCategory } from "../category.controller";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return deleteCategory(request, params.id);
}
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  return editCategory(request, id);
}
