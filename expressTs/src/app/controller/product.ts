import { connectDB } from '../../config/db';
import { Request, Response } from 'express';

// ✅ GET ALL PRODUCTS WITH ADVANCED FILTER
export const getProducts = async (req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const {
      season,
      subtone,
      dominant,
      styles,
      sizes,
      price_gte,
      price_lte,
      category,
    } = req.query;

    let query = 'SELECT * FROM products WHERE 1=1';
    const params: any[] = [];

    // Size filter
    if (sizes) {
      const sizeArray = (sizes as string).split(',');
      query += ` AND size IN (${sizeArray.map(() => '?').join(',')})`;
      params.push(...sizeArray);
    }

    // Price filters
    if (price_gte) {
      query += ' AND price >= ?';
      params.push(Number(price_gte));
    }

    if (price_lte) {
      query += ' AND price <= ?';
      params.push(Number(price_lte));
    }

    // Personal Color filters
    if (season) {
      query += ' AND season = ?';
      params.push(season);
    }

    if (subtone) {
      query += ' AND subtone = ?';
      params.push(subtone);
    }

    if (dominant) {
      query += ' AND dominant = ?';
      params.push(dominant);
    }

    if (styles) {
      const styleArray = (styles as string).split(',');
      query += ` AND style IN (${styleArray.map(() => '?').join(',')})`;
      params.push(...styleArray);
    }

    // Category filter by slug
    if (category) {
      const [categoryRows] = await db.execute(
        'SELECT id FROM category WHERE slug = ?',
        [category]
      );

      if (!Array.isArray(categoryRows) || categoryRows.length === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }

      const categoryId = (categoryRows[0] as any).id;
      query += ' AND category_id = ?';
      params.push(categoryId);
    }

    const [rows] = await db.execute(query, params);
    res.status(200).json(rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// ✅ GET PRODUCTS BY CATEGORY SLUG
export const getCategoryProducts = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const db = await connectDB();

    const [categories] = await db.execute(
      'SELECT id FROM category WHERE slug = ?',
      [slug]
    );

    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const categoryId = (categories[0] as any).id;

    const [products] = await db.execute(
      'SELECT * FROM products WHERE category_id = ?',
      [categoryId]
    );

    res.status(200).json(products);
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm theo category:', error);
    res.status(500).json({ error: 'Lỗi server khi lọc sản phẩm theo category' });
  }
};

// GET sản phẩm có saleOff cao nhất
export const getProductsSaleOffTop = async (req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const [rows] = await db.execute(
      'SELECT * FROM products WHERE saleOff > 0 ORDER BY saleOff DESC LIMIT 16'
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm sale:', error);
    res.status(500).json({ error: 'Lỗi server khi lấy sản phẩm sale' });
  }
};

// GET sản phẩm mới về NewArrivals
export const getProductsNewArrivals = async (req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const [rows] = await db.execute(
      'SELECT * FROM products ORDER BY created_at DESC LIMIT 16'
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm mới về:', error);
    res.status(500).json({ error: 'Lỗi server khi lấy sản phẩm mới về' });
  }
};


// ✅ GET SINGLE PRODUCT BY ID
export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const db = await connectDB();
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);

    if (Array.isArray(rows) && rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
