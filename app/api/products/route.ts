import mongoose from "mongoose";
import { connectDB } from "../../../lib/mongodb";
import Product from "../../../models/Product";


export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body.name !== "string" ||
        !body.name.trim() || typeof body.price !== "number" ||
        !Number.isFinite(body.price) || body.price < 0) {
      return Response.json(
        { message: "Send a name and a price of 0 or more" },
        { status: 400 }
      );
    }

    await connectDB();

    // Pick the fields we allow. Do not pass the whole body.
    const product = await Product.create({
      name: body.name,
      price: body.price,
    });

    return Response.json(product, { status: 201 });
  } catch (error) {
    if (error instanceof SyntaxError ||
        error instanceof mongoose.Error.ValidationError) {
      return Response.json(
        { message: "Invalid product data" }, { status: 400 }
      );
    }

    console.error(error);
    return Response.json(
      { message: "Could not add product" }, { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return Response.json(products);
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Could not retrieve products" },
      { status: 500 }
    );
  }
}
