import mongoose, { Schema, type InferSchemaType } from 'mongoose';

interface ProductModel {
    name: string;
    productId: string;
    price: number;
    count: number;
}

const ProductSchema = new Schema<ProductModel>({
    name: { type: String, required: true },
    productId: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    count: { type: Number, required: true }
});

export type Product = InferSchemaType<typeof ProductSchema>;

export type ProductDocument = mongoose.HydratedDocument<Product>;

const ProductModel = mongoose.model<ProductModel>('Product', ProductSchema);

export default ProductModel;
