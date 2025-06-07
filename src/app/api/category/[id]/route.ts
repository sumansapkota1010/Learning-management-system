import { NextRequest, NextResponse } from "next/server";
import { deleteCategory, editCategory } from "../category.controller";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { id } = context.params;
  return deleteCategory(request, id);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { id } = context.params;
  return editCategory(request, id);
}
