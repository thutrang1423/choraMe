import db from '../../config/db';
import { Request, Response } from 'express';

//get categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    // const db = await connectDB();
    const [rows] = await db.execute('SELECT id, name, slug FROM category');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách danh mục:', error);
    res.status(500).json({ error: 'Không thể lấy danh sách danh mục' });
  }
};