import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const CryptoJS = require("crypto-js")
import { Register, IUser } from "../models/register.model"
import path from "path"

export async function login(req: Request, res: Response) {
    const { username, password } = req.body

    try {
        function encrypted(keys: string) {
            var key = `kHbearbugwZXnattCx5okokNilokokk2024`
            var iv = `bearbugUw5OKJA8ZEZA`
            key = CryptoJS.enc.Hex.parse(key)
            iv = CryptoJS.enc.Hex.parse(iv)
            var encrypted = CryptoJS.AES.encrypt(keys, key, { iv: iv })

            console.log("encrypted", JSON.stringify(encrypted.toString()))

            // decryptedMassage(encrypted);

            // //console.log("decrypted", decryptedMassage(encrypted));
            return encrypted.toString()
        }
        function decryptedMassage(message: string) {
            var key = `kHbearbugwZXnattCx5okokNilokokk2024`
            var iv = `bearbugUw5OKJA8ZEZA`
            key = CryptoJS.enc.Hex.parse(key)
            iv = CryptoJS.enc.Hex.parse(iv)
            var decrypted = CryptoJS.AES.decrypt(message, key, { iv: iv })
            return decrypted.toString(CryptoJS.enc.Utf8)
        }
        // Find user by username
        const user: IUser | null = await Register.findOne({ username })

        if (!user) {
            return res.status(400).json({ message: "Invalid username" })
        }

        // Check password
        const isMatch: boolean = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "username or password is incorrect" })
        }

        if (username === "admin") {
            return res.redirect("dashboard.html")
        }

        // Create JWT payload
        const payload = {
            user: {
                id: user.id,
            },
        }
        console.log("login")
        var cipher = encrypted(
            `{"id": ${user.id}, "salt": ${new Date().getTime()}}`
        )

        return res.status(200).json({ code: 200, message: "ok", token: cipher })
        // Sign token
        // jwt.sign(
        //     payload,
        //     "jwtSecret",
        //     { expiresIn: 3600 },
        //     (err: Error | null, token: string | undefined) => {
        //         if (err) {
        //             console.error("Error signing token:", err)
        //             return res.status(500).json({ message: "Server error" })
        //         }
        //         if (!token) {
        //             console.error("Token not generated")
        //             return res.status(500).json({ message: "Server error" })
        //         }
        //         // Store token in local storage
        //         res.json({ token })

        //         // Set token in local storage
        //         if (token) {
        //             // In the browser, localStorage is available
        //             // So, you can set the token in local storage
        //             localStorage.setItem("jwtToken", token)
        //         }
        //     }
        // )
    } catch (error) {
        console.error("Error logging in user:", error)
        res.status(500).json({ message: "Server error" })
    }
}
