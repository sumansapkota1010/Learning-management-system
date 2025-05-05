import connectDb from "@/database/connection";
import Category from "@/database/models/category.schema";
import authMiddleware from "../../../../middleware/auth.middleware";
import { NextRequest } from "next/server";

export async function createCategory(req: Request) {
  try {
    const response = authMiddleware(req as NextRequest);
    await connectDb();
    const { name, description } = await req.json();

    //exist or not
    const existingCategory = await Category.findOne({ name: name });
    if (existingCategory) {
      return Response.json(
        {
          message: "Category already exists with that name",
        },
        { status: 400 }
      );
    }

    await Category.create({
      name: name,
      description: description,
    });
    return Response.json(
      {
        message: "Category created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function getCategory(req: Request) {
  try {
    await connectDb();
    const category = await Category.find();
    if (category.length == 0) {
      return Response.json(
        {
          message: "No categories found ",
        },
        { status: 400 }
      );
    }
    return Response.json({
      message: "Categories fetch successfully",
      data: category,
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function deleteCategory(req: Request) {
  try {
    await connectDb();
  } catch (error) {}
}
