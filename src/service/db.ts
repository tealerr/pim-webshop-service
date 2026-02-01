// db.ts
import mongoose from "mongoose"
import { dbConfig } from "../config/database"

// Connect to MongoDB
const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...")
        await mongoose.connect(dbConfig.uri, dbConfig.options as any)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
        process.exit(1)
    }
}

export default connectDB
