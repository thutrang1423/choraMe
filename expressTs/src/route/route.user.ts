import express from "express";
import { verifyToken, allowRoles } from "../app/middleware/authMiddleware";
import {getCart, accessPersonalColor, addToCart} from "../app/controller/customer.controller"

const router = express.Router();

// 👤 Trang dành cho khách hàng đã đăng nhập
router.get("/cart", verifyToken, allowRoles("customer"), getCart);
router.post("/cart", verifyToken, allowRoles("customer"), addToCart);

router.get("/personal-color",verifyToken,allowRoles("customer"),accessPersonalColor);

// 👑 Trang dành riêng cho admin
// router.get("/admin/dashboard", verifyToken, allowRoles("admin"), getAdminDashboard);

export default router;
