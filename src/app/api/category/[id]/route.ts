import { NextRequest, NextResponse } from "next/server";
import { deleteCategory } from "../category.controller";

export const DELETE = deleteCategory;

/* export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  return editCategory(request, id);
} */
