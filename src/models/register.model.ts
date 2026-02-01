import mongoose, { Document, Schema } from "mongoose"
import bcrypt from "bcrypt"

// Define the interface for the user document
interface IUser extends Document {
    username: string
    email: string
    password: string
}

// Define the schema for registration
const registerSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

// Hash the password before saving
registerSchema.pre<IUser>("save", async function (next) {
    const user = this

    if (!user.isModified("password")) return next()

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        user.password = hashedPassword
        next()
    } catch (error: any) {
        next(error)
    }
})

// Create the Register model
const Register = mongoose.model<IUser>("Register", registerSchema)

export { Register, IUser }
