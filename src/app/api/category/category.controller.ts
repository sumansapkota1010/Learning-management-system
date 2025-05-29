import connectDb from "@/database/connection";
import Category from "@/database/models/category.schema";

import { NextRequest } from "next/server";
import { adminAuth } from "../../../../middleware/admin-auth.middleware";

export async function createCategory(req: Request) {
  try {
    await connectDb();
    const response = await adminAuth(req as NextRequest);

    if (response.status === 401) {
      return response;
    }

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

    const category = await Category.create({
      name: name,
      description: description,
    });
    return Response.json(
      {
        message: "Category created successfully",
        data: category,
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
    const categories = await Category.find();
    return Response.json(
      {
        message: "Categories fetched successfully",
        data: categories,
      },
      { status: 200 }
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
export async function deleteCategory(req: Request, id: string) {
  try {
    await connectDb();
    const response = await adminAuth(req as NextRequest);

    if (response.status === 401) {
      return response;
    }

    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) {
      return Response.json(
        {
          message: "Something went wrong",
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        message: "Category Deleted Successfully",
      },
      { status: 200 }
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

export async function editCategory(req: Request, id: string) {
  try {
    connectDb();
    const response = await adminAuth(req as NextRequest);

    if (response.status === 401) {
      return response;
    }
    const { name, description } = await req.json();
    const updatedCat = await Category.findByIdAndUpdate(
      id,
      {
        name: name,
        description: description,
      },
      { new: true }
    );
    return Response.json(
      {
        message: "Category edit Successfully",
        data: updatedCat,
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
