import { Request, Response } from "express";
import db from "../../config/db";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcryptjs";

export const getCurrentUser = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  try {
    const [users] = await db.execute<RowDataPacket[]>(
      "SELECT id, username, email, full_name, role, created_at FROM users WHERE id = ?",
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json("Không tìm thấy người dùng");
    }

    res.status(200).json(users[0]);
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json("Lỗi server");
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { email, full_name, currentPassword, newPassword } = req.body;

  try {
    // 1. Lấy user từ DB
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json("Không tìm thấy người dùng.");
    }

    const user = rows[0];

    // 2. Kiểm tra current password
    const isPasswordCorrect = bcrypt.compareSync(
      currentPassword,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json("Mật khẩu hiện tại không đúng.");
    }

    // 3. Chuẩn bị query và params
    const updates: string[] = [];
    const params: any[] = [];

    if (email && email !== user.email) {
      updates.push("email = ?");
      params.push(email);
    }

    if (full_name && full_name !== user.full_name) {
      updates.push("full_name = ?");
      params.push(full_name);
    }

    if (newPassword) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);
      updates.push("password = ?");
      params.push(hashedPassword);
    }

    if (updates.length === 0) {
      return res.status(400).json("Không có gì để cập nhật.");
    }

    // 4. Update user
    const updateQuery = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
    params.push(userId);

    await db.execute(updateQuery, params);

    res.status(200).json("Cập nhật thông tin thành công.");
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json("Lỗi server khi cập nhật thông tin.");
  }
};
