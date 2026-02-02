import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { Register, IUser } from '../models/register.model';
import path from 'path';

export async function login(req: Request, res: Response) {
    const { username, password } = req.body;
    const keyString = 'kHbearbugwZXnattCx5okokNilokokk2024';
    const ivString = 'bearbugUw5OKJA8ZEZA';
    try {
        function encrypted(keys: string) {
            const key = CryptoJS.enc.Hex.parse(keyString);
            const iv = CryptoJS.enc.Hex.parse(ivString);
            const encrypted = CryptoJS.AES.encrypt(keys, key, { iv: iv });

            console.log('encrypted', JSON.stringify(encrypted.toString()));

            return encrypted.toString();
        }
        function decryptedMassage(message: string) {
            const key = CryptoJS.enc.Hex.parse(keyString);
            const iv = CryptoJS.enc.Hex.parse(ivString);
            const decrypted = CryptoJS.AES.decrypt(message, key, { iv: iv });
            return decrypted.toString(CryptoJS.enc.Utf8);
        }
        // Find user by username
        const user: IUser | null = await Register.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'Invalid username' });
        }

        // Check password
        const isMatch: boolean = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ message: 'username or password is incorrect' });
        }

        if (username === 'admin') {
            return res.redirect('dashboard.html');
        }

        // Create JWT payload
        const payload = {
            user: {
                id: user.id
            }
        };
        console.log('login');
        const cipher = encrypted(
            `{"id": ${user.id}, "salt": ${new Date().getTime()}}`
        );

        return res.status(200).json({ code: 200, message: 'ok', token: cipher });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
