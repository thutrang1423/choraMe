import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

interface DecodedToken{
    id: number;
    role:"guest" | "customer" | "admin";
    iat: number;
    exp: number;
}

declare global {
    namespace Express{
        interface Request{
            user?: DecodedToken;
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;

    if(!token) {
        return res.status(401).json("Bạn chưa đăng nhập");
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
        req.user = decoded;
        next();
    } catch(err){
        return res.status(403).json("Token không hợp lệ")
    }
}

export const allowRoles = (...allowedRoles:("guest" | "customer" | "admin")[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req.user?.role;

        if(!role || !allowedRoles.includes(role)){
            return res.status(403).json("Bạn không có quyền truy cập vào trang này!")
        }
        next();
    }
}