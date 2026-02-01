// uploadImage.ts
import express from "express"
import multer from "multer"
import path from "path"
import Image from "../models/image.model"

const app = express()

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, callback) => {
        callback(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        )
    },
})

const upload = multer({ storage: storage })

// Function to handle image storage
const uploadImageFunction = async (req: any, res: any) => {
    const newImage = new Image({
        filename: req.file.filename,
        path: req.file.path,
    })

    try {
        const image = await newImage.save()
        res.json({ image })
    } catch (error) {
        res.status(500).send(error)
    }
}

// Define a route for uploading images
app.post("/upload", upload.single("image"), uploadImageFunction)

// Define a route for retrieving images
app.get("/images", async (req, res) => {
    try {
        const images = await Image.find()
        res.json({ images })
    } catch (error: any) {
        res.status(500).send(error.message)
    }
})

export { uploadImageFunction }
