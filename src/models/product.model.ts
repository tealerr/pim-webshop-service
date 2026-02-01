import mongoose, { Document, Schema } from "mongoose"

interface ProductModel {
    name: string
    productId: string
    price: number
    count: number
}

const ProductSchema = new Schema<ProductModel>({
    name: { type: String, required: true },
    productId: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    count: { type: Number, required: true },
})

const ProductModel = mongoose.model<ProductModel>("Product", ProductSchema)

export default ProductModel
