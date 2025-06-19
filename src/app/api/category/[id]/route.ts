import { NextRequest, NextResponse } from "next/server";
import { deleteCategory, editCategory, getCategoryById } from "../category.controller";

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

export async function GET(
  request: NextRequest,

  context: { params: { id: string } }
) {
  const { id } = context.params;
  return getCategoryById(request, id);
}
