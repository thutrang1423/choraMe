import { Router } from "express";
import { addToCart, getCartItems, deleteCartItem, updateCartItemQuantity} from "../app/controller/cart.controller";
import { verifyToken } from "../app/middleware/authMiddleware";

const router = Router();

router.post("/add", verifyToken, addToCart);       // ✅ thêm sản phẩm
router.get("/", verifyToken, getCartItems);         // 🔍 xem giỏ hàng (tuỳ chọn)
router.delete("/:cartId", verifyToken, deleteCartItem); // <-- new
router.put("/:cartId", verifyToken, updateCartItemQuantity); // <-- new

export default router;
