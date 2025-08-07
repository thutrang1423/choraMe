import { Request, Response } from "express";
import db from "../../config/db";
import { RowDataPacket } from "mysql2";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { product_id, color_id, size_id, quantity } = req.body;

    if (!product_id || !color_id || !size_id || !quantity) {
      return res.status(400).json({ message: "Thiếu thông tin sản phẩm." });
    }

    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT * FROM cart_products 
       WHERE user_id = ? AND product_id = ? AND color_id = ? AND size_id = ?`,
      [userId, product_id, color_id, size_id]
    );

    if (rows.length > 0) {
      await db.query(
        `UPDATE cart_products 
         SET quantity = quantity + ? 
         WHERE user_id = ? AND product_id = ? AND color_id = ? AND size_id = ?`,
        [quantity, userId, product_id, color_id, size_id]
      );
    } else {
      await db.query(
        `INSERT INTO cart_products (user_id, product_id, color_id, size_id, quantity)
         VALUES (?, ?, ?, ?, ?)`,
        [userId, product_id, color_id, size_id, quantity]
      );
    }

    return res.status(200).json({ message: "Đã thêm vào giỏ hàng." });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Lỗi server." });
  }
};

export const getCartItems = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  try {
    const [rows] = await db.query(
      `SELECT 
        cp.id AS cart_id,
        cp.product_id,
        cp.color_id,
        cp.size_id,
        cp.quantity,
        cp.added_at,
        p.title,
        pv.price,
        pv.sale_price,
        pv.image,
        c.name AS color,
        c.hex_code,
        s.name AS size
      FROM cart_products cp
      JOIN product_variants pv ON pv.product_id = cp.product_id AND pv.color_id = cp.color_id AND pv.size_id = cp.size_id
      JOIN products p ON cp.product_id = p.id
      JOIN colors c ON cp.color_id = c.id
      JOIN sizes s ON cp.size_id = s.id
      WHERE cp.user_id = ?`,
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error("Get cart items error:", err);
    res.status(500).json({ message: "Không thể lấy giỏ hàng." });
  }
};
