import mongoose, { Document, Schema } from "mongoose"

interface CustomerInfoModel extends Document {
    email: string
    phoneNumber: string
    name: string
    address: string
    city: string
    state: string
    zip: string
    image: string
}

const CustomerInfoSchema = new Schema<CustomerInfoModel>({
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    image: { type: String, required: true },
})

const CustomerInfoModel = mongoose.model<CustomerInfoModel>(
    "CustomerInfo",
    CustomerInfoSchema
)

export default CustomerInfoModel
