import { Router } from "express";
import { addToCart, getCartItems } from "../app/controller/cart.controller";
import { verifyToken } from "../app/middleware/authMiddleware";

const router = Router();

router.post("/add", verifyToken, addToCart);       // ✅ thêm sản phẩm
router.get("/", verifyToken, getCartItems);         // 🔍 xem giỏ hàng (tuỳ chọn)

export default router;
