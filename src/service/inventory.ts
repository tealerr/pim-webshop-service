import { Request, Response } from "express"
import Product from "../models/product.model"

export const getProductById = async (productId: string) => {
    try {
        const product = await Product.findOne({ productId })
        if (!product) {
            throw new Error("Product not found")
        }
        return { name: product.name, count: product.count }
    } catch (error: any) {
        console.error("Error in getProductById:", error)
        throw new Error("Internal Server Error")
    }
}

export const updateProductCount = async (
    productId: string,
    countToSubtract: number
) => {
    try {
        const product = await Product.findOne({ productId })

        if (!product) {
            throw new Error("Product not found")
        }

        if (product.count < countToSubtract) {
            throw new Error("Not enough stock")
        }

        product.count -= countToSubtract
        await product.save()

        return product
    } catch (error: any) {
        throw new Error(`Update Product Count Error: ${error.message}`)
    }
}

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find()
        const formattedProducts = products.map((product) => ({
            productId: product.productId,
            name: product.name,
            count: product.count,
        }))

        res.json({
            products: formattedProducts,
        })
    } catch (error: any) {
        res.status(500).send(error.toString())
    }
}

export const checkoutProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.body
        const { count } = req.body

        if (!productId || !count) {
            return res.status(400).json({ error: "Missing required fields" })
        }

        const existingProduct = await Product.findOne({ productId })

        if (!existingProduct) {
            return res.status(404).json({ error: "Product not found" })
        }

        if (count > existingProduct.count) {
            const errorMessage = `Product in stock not enough for your requested quantity. Currently, the product has ${existingProduct.count} quantity.`

            return res.status(500).json({
                error: errorMessage,
            })
        }

        if (existingProduct.count == 0) {
            return res.status(404).json({ error: "Product out of stock" })
        }

        const updatedProduct = await updateProductCount(productId, count)
        res.json({
            message: "Product count updated successfully!",
            product: {
                productId: updatedProduct.productId,
                name: updatedProduct.name,
                count: updatedProduct.count,
            },
        })
    } catch (error: any) {
        console.error("Error in checkoutProduct:", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}
