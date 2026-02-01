// db.ts
import mongoose from "mongoose"
import { any } from "webidl-conversions"

// Connect to MongoDB
const connectDB = async () => {
    try {
        // username = doadmin
        // password = 0Jp1Y8j25bKZ649r hide
        // host = mongodb+srv://db-mongodb-sgp1-43271-7f9131f1.mongo.ondigitalocean.com
        // database = admin
        console.log("Connecting...")
        // "mongodb+srv://doadmin:0Jp1Y8j25bKZ649r@db-mongodb-sgp1-43271-7f9131f1.mongo.ondigitalocean.com/admin?retryWrites=true"
        await mongoose.connect(
            "mongodb+srv://doadmin:0Jp1Y8j25bKZ649r@db-mongodb-sgp1-43271-7f9131f1.mongo.ondigitalocean.com/admin",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as any
        )
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
        process.exit(1)
    }
}

export default connectDB
