import nodemailer from "nodemailer"
import yaml from "js-yaml"
import fs from "fs"

interface MailRequest {
    to: string
    subject: string
    text: string
}

const sendMailFunction = async (reqBody: MailRequest): Promise<string> => {
    try {
        const confirmTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${reqBody.subject}</title>
        </head>
        <body>
            <div style="text-align: center; padding: 20px;">
                <h2>ขอบคุณสำหรับคำสั่งซื้อ</h2>
                <p>${reqBody.text}</p>
            </div>
        </body>
        </html>
        `
        // const dataFilePath = "data.yml"

        // const data: Record<string, any> = yaml.load(
        //     fs.readFileSync(dataFilePath, "utf8")
        // ) as Record<string, any>

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "forwebpim@gmail.com",
                pass: "rrzb vnaw vxwa euny",
            },
        })

        const mailOptions = {
            from: "PIM WebShop <forwebpim@gmail.com>",
            to: reqBody.to,
            subject: reqBody.subject,
            text: reqBody.text,
            html: confirmTemplate,
        }

        const info = await transporter.sendMail(mailOptions)

        return `Email sent: ${info.response}`
    } catch (error: any) {
        throw error.toString()
    }
}

export { sendMailFunction }
