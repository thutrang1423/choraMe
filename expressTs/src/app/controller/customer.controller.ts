import { Request, Response } from "express";
import db from "../../config/db";
import { RowDataPacket } from "mysql2";

// 🔍 Lấy giỏ hàng của người dùng hiện tại
export const getCart = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT c.id, c.quantity, p.id as productId, p.title, p.price, p.salePrice, p.image FROM carts c JOIN products p ON c.productId = p.id WHERE c.userId = ?",
      [userId]
    );

    return res.status(200).json(rows);
  } catch (err) {
    console.error("Lỗi khi lấy giỏ hàng:", err);
    return res.status(500).json("Lỗi server khi lấy giỏ hàng");
  }
};

// ➕ Thêm sản phẩm vào giỏ hàng
export const addToCart = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { productId, quantity } = req.body;

  try {
    // Kiểm tra sản phẩm đã có trong giỏ chưa
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT * FROM carts WHERE userId = ? AND productId = ?",
      [userId, productId]
    );

    if (rows.length > 0) {
      // Nếu đã có ➜ cập nhật số lượng
      await db.execute(
        "UPDATE carts SET quantity = quantity + ? WHERE userId = ? AND productId = ?",
        [quantity, userId, productId]
      );
    } else {
      // Nếu chưa có ➜ thêm mới
      await db.execute(
        "INSERT INTO carts (userId, productId, quantity) VALUES (?, ?, ?)",
        [userId, productId, quantity]
      );
    }

    return res.status(200).json("Đã thêm vào giỏ hàng");
  } catch (err) {
    console.error("Lỗi khi thêm vào giỏ hàng:", err);
    return res.status(500).json("Lỗi server khi thêm vào giỏ hàng");
  }
};

// 🎨 Truy cập trang phân tích màu cá nhân (có thể trả về dữ liệu nếu cần)
export const accessPersonalColor = async (_req: Request, res: Response) => {
  return res.status(200).json("Trang phân tích màu cá nhân");
};
