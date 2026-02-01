import { Request, Response } from "express"
import Product from "../models/product.model"

const updateProductName = async (
    existingProduct: any,
    name: string,
    res: Response
) => {
    existingProduct.name = name
    await existingProduct.save()

    return res.status(200).json({
        message: "Product name updated successfully!",
        product: {
            productId: existingProduct.productId,
            name: existingProduct.name,
            count: existingProduct.count,
            price: existingProduct.price,
        },
    })
}

const updateProductPrice = async (
    existingProduct: any,
    price: number,
    res: Response
) => {
    existingProduct.price = price
    await existingProduct.save()

    return res.status(200).json({
        message: "Product price updated successfully!",
        product: {
            productId: existingProduct.productId,
            name: existingProduct.name,
            count: existingProduct.count,
            price: existingProduct.price,
        },
    })
}

const updateProductCount = async (
    existingProduct: any,
    count: number,
    res: Response
) => {
    existingProduct.count = count
    await existingProduct.save()

    return res.status(200).json({
        message: "Product count updated successfully!",
        product: {
            productId: existingProduct.productId,
            name: existingProduct.name,
            count: existingProduct.count,
            price: existingProduct.price,
        },
    })
}

export const addProduct = async (req: Request, res: Response) => {
    try {
        const { name, productId, count, price } = req.body

        if (!name || !productId || price === undefined) {
            return res.status(400).json({ error: "Missing required fields" })
        }

        let existingProduct = await Product.findOne({ productId })

        if (existingProduct) {
            if (existingProduct.name !== name) {
                return await updateProductName(existingProduct, name, res)
            }

            if (existingProduct.count === count) {
                return await updateProductPrice(existingProduct, price, res)
            }
        }

        existingProduct = await Product.findOne({ productId, name })

        if (existingProduct) {
            if (existingProduct.count !== count) {
                return await updateProductCount(existingProduct, count, res)
            }

            return res.status(200).json({
                message:
                    "Product already exists with the same name and productId.",
                product: {
                    productId: existingProduct.productId,
                    name: existingProduct.name,
                    count: existingProduct.count,
                    price: existingProduct.price,
                },
            })
        }

        const newProduct = new Product({ name, productId, count, price })
        await newProduct.save()

        res.status(201).json({
            message: "Product has been created successfully!",
            product: {
                name: newProduct.name,
                productId: newProduct.productId,
                price: newProduct.price,
                count: newProduct.count,
            },
        })
    } catch (error) {
        console.error("Error inserting/updating product:", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}
