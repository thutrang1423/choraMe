import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "2BJJye4dx4t7ujreCKD/rEAHEFFbZgCt7nLDlnjHtdy7I9tTm2Mb2sqekZ4dNIz1X9g/ytOSnvwg7eXsya85vNl5GYP36FPoY2525r4x+arM6Tz/fuwogVz0a4VSLSPljcV4ejuDXxrvKKhSNqaNDuM7d+nrGK5S2vUIA9FIXkZTB3YtjwrvHjxeMjmxddWwM15Hum9I1hr4MsOah585vwaCQz8pwiyXDNcpIcy4auRekpbU0AKJpfL/kCCFRqsFGEg9+vV0zWljwAETMY1jefhaIZGSeFWnDVLM6f2IJMK3L8CLBuEzbU6eA2tE6zDTDfV3HpEyJ2If/CJM0+MciA==";

interface DecodedToken {
  id: number;
  role: "user" | "admin";
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  // console.log("cookies:", req.cookies);

  if (!token) {
    return res.status(401).json("Bạn chưa đăng nhập");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    // console.log("🧾 Decoded token:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json("Token không hợp lệ");
  }
};

export const allowRoles = (...allowedRoles: ("user" | "admin")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;

    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json("Bạn không có quyền truy cập vào trang này!");
    }
    next();
  };
};
