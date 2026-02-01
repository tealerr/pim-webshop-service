// customer.service.ts
import { Request, Response } from "express"
import CustomerInfoModel from "../models/customer.model"

export const insertCustomerInfo = async (req: Request, res: Response) => {
    try {
        const { email, phoneNumber, name, address, city, state, zip, image } =
            req.body

        // Create a new customerInfo document
        const newCustomerInfo: CustomerInfoModel = new CustomerInfoModel({
            email,
            phoneNumber,
            name,
            address,
            city,
            state,
            zip,
            image,
        })

        // Save the customerInfo document to the database
        await newCustomerInfo.save()

        res.status(201).json({
            message: "Customer information inserted successfully",
            customerInfo: newCustomerInfo,
        })
    } catch (error: any) {
        res.status(500).send(error.toString())
    }
}

export const getCustomerInfo = async (req: Request, res: Response) => {
    try {
        // Retrieve all customerInfo documents from the database
        const customerInfo = await CustomerInfoModel.find()

        // Format the customerInfo data for response
        const formattedCustomerInfo = customerInfo.map((customerInfo) => ({
            email: customerInfo.email,
            phoneNumber: customerInfo.phoneNumber,
            name: customerInfo.name,
            address: customerInfo.address,
            city: customerInfo.city,
            state: customerInfo.state,
            zip: customerInfo.zip,
            image: customerInfo.image,
        }))

        res.json({
            detail: formattedCustomerInfo,
        })
    } catch (error: any) {
        res.status(500).send(error.toString())
    }
}
