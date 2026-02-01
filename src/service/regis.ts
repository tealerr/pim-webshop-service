import { Request, Response } from "express"
import { Register } from "../models/register.model"

// Registration function
export async function register(req: Request, res: Response) {
    const { username, email, password } = req.body
    console.log("username", username)
    console.log("email", email)
    console.log("password", password)

    // Password complexity rules
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#_A-a]).{8,}$/

    if (!passwordRegex.test(password)) {
        return res.status(200).json({
            code: 400,
            message: "Password complexity requirements not met.",
        })
    }

    // Create new user
    const newRegister = new Register({ username, email, password })

    try {
        const existingUser = await Register.findOne({ username: username })
        console.log("existingUser", existingUser)
        if (existingUser) {
            return res.status(200).json({ code: 901, message: "User exist" })
        } else {
            const existingMial = await Register.findOne({ email: email })
            if (existingMial) {
                return res
                    .status(200)
                    .json({ code: 902, message: "User exist" })
            } else {
                await newRegister.save()
                return res
                    .status(200)
                    .json({ code: 200, message: "Registration successful" })
            }
        }
    } catch (error: any) {
        console.error("Error registering user:", error)
        if (error.code === 11000) {
            // Unique constraint violation error
            const key = Object.keys(error.keyValue)[0]
            const value = error.keyValue[key]
            let errorMessage
            if (key === "username") {
                errorMessage = `Username '${value}' is already taken.`
            } else if (key === "email") {
                errorMessage = `Email '${value}' is already registered.`
            } else {
                errorMessage = "Registration failed."
            }
            return res.status(200).json({ code: 400, message: errorMessage })
        } else {
            return res
                .status(200)
                .json({ code: 500, message: "Registration failed." })
        }
    }
}
