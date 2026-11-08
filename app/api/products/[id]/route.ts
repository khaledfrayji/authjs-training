import mongoose from "mongoose";
import { connectDB } from "../../../../lib/mongodb";
import Product from "../../../../models/Product";

export const runtime = "nodejs";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: Context) {
  try {
    const { id } = await context.params;

    if (!mongoose.isObjectIdOrHexString(id)) {
      return Response.json(
        { message: "Invalid product ID" }, { status: 400 }
      );
    }

    const body = await request.json();

    if (!body || typeof body !== "object" ||
        Array.isArray(body)) {
      return Response.json(
        { message: "Send a JSON object" }, { status: 400 }
      );
    }

    if (body.name === undefined && body.price === undefined) {
      return Response.json(
        { message: "Send name or price" }, { status: 400 }
      );
    }

    if (body.name !== undefined &&
        (typeof body.name !== "string" || !body.name.trim())) {
      return Response.json(
        { message: "Name must not be empty" }, { status: 400 }
      );
    }

    if (body.price !== undefined &&
        (typeof body.price !== "number" ||
         !Number.isFinite(body.price) || body.price < 0)) {
      return Response.json(
        { message: "Price must be 0 or more" }, { status: 400 }
      );
    }

    await connectDB();

    const product = await Product.findById(id);

    if (!product) {
      return Response.json(
        { message: "Product not found" }, { status: 404 }
      );
    }

    // Only change fields included in this request.
    if (body.name !== undefined) product.name = body.name;
    if (body.price !== undefined) product.price = body.price;

    await product.save(); // Runs schema validation.

    return Response.json(product);
  } catch (error) {
    if (error instanceof SyntaxError ||
        error instanceof mongoose.Error.ValidationError) {
      return Response.json(
        { message: "Invalid product data" }, { status: 400 }
      );
    }

    console.error(error);
    return Response.json(
      { message: "Could not update product" }, { status: 500 }
    );
  }
}