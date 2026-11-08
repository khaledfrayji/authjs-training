import "server-only";
import mongoose, { Schema, Model } from "mongoose";

type ProductData = {
  name: string;
  price: number;
};

const productSchema = new Schema<ProductData>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    validate: Number.isFinite,
  },
}, { timestamps: true });

// Reuse the model when Next.js reloads the file.
const Product: Model<ProductData> =
  mongoose.models.Product ||
  mongoose.model<ProductData>("Product", productSchema);

export default Product;
	
// MongoDB collection: products
// MongoDB adds _id.
// timestamps adds createdAt and updatedAt.
// Price is a simple demo field, not a complete money model.