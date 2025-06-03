import { NextRequest, NextResponse } from "next/server";
import { deleteCategory } from "../category.controller";

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { message: "Category ID is missing in URL" },
      { status: 400 }
    );
  }

  return deleteCategory(request, id);
}
/* export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  return editCategory(request, id);
} */
