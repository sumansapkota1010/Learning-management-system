import {
  createCategory,
  deleteCategory,
  getCategory,
} from "./category.controller";

export async function POST(req: Request) {
  return createCategory(req);
}

export async function GET(req: Request) {
  return getCategory(req);
}

export async function DELETE(req: Request) {
  return deleteCategory(req);
}
