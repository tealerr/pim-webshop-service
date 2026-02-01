import mongoose, { Document } from "mongoose"

// Define the image document interface
interface ImageDocument extends Document {
    filename: string
    path: string
}

// Create a schema for the image model
const imageSchema = new mongoose.Schema({
    filename: String,
    path: String,
})

// Create the image model
const Image = mongoose.model<ImageDocument>("Image", imageSchema)

export default Image
