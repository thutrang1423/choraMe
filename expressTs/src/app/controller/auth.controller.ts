import {Request, Response} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from '../../config/db';
import { RowDataPacket } from "mysql2";

const JWT_SECRET = process.env.JWT_SECRET || "2BJJye4dx4t7ujreCKD/rEAHEFFbZgCt7nLDlnjHtdy7I9tTm2Mb2sqekZ4dNIz1X9g/ytOSnvwg7eXsya85vNl5GYP36FPoY2525r4x+arM6Tz/fuwogVz0a4VSLSPljcV4ejuDXxrvKKhSNqaNDuM7d+nrGK5S2vUIA9FIXkZTB3YtjwrvHjxeMjmxddWwM15Hum9I1hr4MsOah585vwaCQz8pwiyXDNcpIcy4auRekpbU0AKJpfL/kCCFRqsFGEg9+vV0zWljwAETMY1jefhaIZGSeFWnDVLM6f2IJMK3L8CLBuEzbU6eA2tE6zDTDfV3HpEyJ2If/CJM0+MciA==";

export const register = async (req: Request, res: Response) => {
    const {username, email, password, name} = req.body;

    try {
        // 1. Check if user exists
        const [existingUsers] = await db.execute<RowDataPacket[]>(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );

        if(existingUsers.length > 0){
            return res.status(409).json("User already exists!");
        }

        //2. Hash password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        //3. Insert new user
        console.log("Registering user:", { username, email, name });
        await db.execute(
            "INSERT INTO users (username, email, password, full_name, role) VALUES (?,?,?,?,?)",
            [username, email, hashedPassword, name, "user"]
        );

        return res.status(201).json("User has been created.");
    } catch (err){
        console.error("Register error:", err);
        return res.status(500).json("Internal server error");
    }
};

export const login = async (req: Request, res: Response) => {
    const {username, password} = req.body;

    try{
        //1. check if user exists
        const [users] = await db.execute<RowDataPacket[]>(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );

        if(users.length === 0){
            return res.status(404).json("User not found!");
        }

        const user = users[0] as {
            id: number;
            password: string;
            role: string;
            [key: string]: any;
        };

        //2. check password
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json("Wrong password or username!");
        }

        //3. create token
        const token = jwt.sign({id: user.id, role: user.role}, JWT_SECRET, {
            expiresIn:"7d",
        });

        //4. return response
        const {password: _, ...userInfo} = user;

        res
            .cookie("accessToken", token, {
                httpOnly: true,
                sameSite:"strict",
                secure: process.env.NODE_ENV?.trim() === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            .status(200)
            .json(userInfo)
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json("Internal server error");
    }
};

export const logout = (_req: Request, res: Response) => {
    res
        .clearCookie("accessToken", {
            sameSite:"strict",
            secure: process.env.NODE_ENV?.trim() === "production",
        })
        .status(200)
        .json("User has been logged out.")
}