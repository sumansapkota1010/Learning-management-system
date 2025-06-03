import { NextRequest, NextResponse } from "next/server";
import { deleteCategory, editCategory } from "../category.controller";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  return deleteCategory(request, id);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  return editCategory(request, id);
}
