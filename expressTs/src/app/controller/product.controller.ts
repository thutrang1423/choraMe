import db from '../../config/db';
import { Request, Response } from "express";

// ✅ GET ALL PRODUCTS WITH ADVANCED FILTER
export const getProducts = async (req: Request, res: Response) => {
  try {
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

    let query = "SELECT * FROM products WHERE 1=1";
    const params: any[] = [];

    // Size filter
    if (sizes) {
      const sizeArray = (sizes as string).split(",");
      query += ` AND size IN (${sizeArray.map(() => "?").join(",")})`;
      params.push(...sizeArray);
    }

    // Price filters
    if (price_gte) {
      query += " AND price >= ?";
      params.push(Number(price_gte));
    }

    if (price_lte) {
      query += " AND price <= ?";
      params.push(Number(price_lte));
    }

    // Personal Color filters
    if (season) {
      query += " AND season = ?";
      params.push(season);
    }

    if (subtone) {
      query += " AND subtone = ?";
      params.push(subtone);
    }

    if (dominant) {
      query += " AND dominant = ?";
      params.push(dominant);
    }

    if (styles) {
      const styleArray = (styles as string).split(",");
      query += ` AND style IN (${styleArray.map(() => "?").join(",")})`;
      params.push(...styleArray);
    }

    // Category filter by slug
    if (category) {
      const [categoryRows] = await db.execute(
        "SELECT id FROM category WHERE slug = ?",
        [category]
      );

      if (!Array.isArray(categoryRows) || categoryRows.length === 0) {
        return res.status(404).json({ error: "Category not found" });
      }

      const categoryId = (categoryRows[0] as any).id;
      query += " AND category_id = ?";
      params.push(categoryId);
    }

    const [rows] = await db.execute(query, params);
    res.status(200).json(rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ GET PRODUCTS BY CATEGORY SLUG
export const getCategoryProducts = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    // const db = await connectDB();

    const [categories] = await db.execute(
      "SELECT id FROM category WHERE slug = ?",
      [slug]
    );

    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    const categoryId = (categories[0] as any).id;

    const [products] = await db.execute(
      "SELECT * FROM products WHERE category_id = ?",
      [categoryId]
    );

    res.status(200).json(products);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm theo category:", error);
    res
      .status(500).json({ error: "Lỗi server khi lọc sản phẩm theo category" });
  }
};

// GET sản phẩm có saleOff cao nhất
export const getProductsSaleOffTop = async (req: Request, res: Response) => {
  try {
    // const db = await connectDB();
    const [rows] = await db.execute(
      "SELECT * FROM products WHERE saleOff > 0 ORDER BY saleOff DESC LIMIT 16"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm sale:", error);
    res.status(500).json({ error: "Lỗi server khi lấy sản phẩm sale" });
  }
};

// GET sản phẩm mới về NewArrivals
export const getProductsNewArrivals = async (req: Request, res: Response) => {
  try {
    // const db = await connectDB();
    const [rows] = await db.execute(
      "SELECT * FROM products ORDER BY created_at DESC LIMIT 16"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm mới về:", error);
    res.status(500).json({ error: "Lỗi server khi lấy sản phẩm mới về" });
  }
};

// ✅ GET SINGLE PRODUCT BY ID
// controller/product.ts
export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // const db = await connectDB();

    // 1. Lấy thông tin sản phẩm chính + chi tiết
    const [productRows] = await db.execute(
      `SELECT 
        p.*, 
        d.des, d.brand, d.material, d.origin, d.gender, d.season, d.is_featured
      FROM products p
      LEFT JOIN product_detail d ON p.id = d.id
      WHERE p.id = ?`,
      [id]
    );

    if (!Array.isArray(productRows) || productRows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const raw = productRows[0] as any;

    const product = {
      id: raw.id,
      title: raw.title,
      price: raw.price,
      salePrice: raw.salePrice,
      saleOff: raw.saleOff,
      created_at: raw.created_at,
      category_id: raw.category_id,
      detail: raw.des
        ? {
            des: raw.des,
            brand: raw.brand,
            material: raw.material,
            origin: raw.origin,
            gender: raw.gender,
            season: raw.season,
            // is_new: !!raw.is_new,
            is_featured: !!raw.is_featured,
          }
        : undefined,
    };

    // 2. Lấy các size áp dụng cho sản phẩm
    const [productSizeRows] = await db.execute(
      `SELECT s.name 
       FROM product_sizes ps
       JOIN sizes s ON ps.size_id = s.id
       WHERE ps.product_id = ?`,
      [id]
    );
    const productSizes = (productSizeRows as any[]).map((row) => row.name);

    // 3. Lấy toàn bộ size hệ thống
    const [allSizesRows] = await db.execute(
      `SELECT name FROM sizes ORDER BY id ASC`
    );
    const allSizes = (allSizesRows as any[]).map((row) => row.name);

    // 4. Lấy danh sách màu sắc của sản phẩm
    const [colorRows] = await db.execute(
      `SELECT c.id, c.name, c.slug, c.hex_code
       FROM product_colors pc
       JOIN colors c ON pc.color_id = c.id
       WHERE pc.product_id = ?`,
      [id]
    );

    // 5. Lấy danh sách hình ảnh
    // let images: string[] = [];
    // try {
    //   const [imageRows] = await db.execute(
    //     `SELECT url FROM product_images WHERE product_id = ?`,
    //     [id]
    //   );
    //   images = (imageRows as any[]).map((row) => row.url);
    // } catch (err) {
    //   console.warn("No image table or failed to fetch images.");
    // }

    // 6. Lấy biến thể (size + color + stock + sku)
    const [variantRows] = await db.execute(
      `SELECT 
        s.name AS size, 
        c.name AS color, 
        pv.stock, 
        pv.sku
       FROM product_variants pv
       JOIN sizes s ON pv.size_id = s.id
       JOIN colors c ON pv.color_id = c.id
       WHERE pv.product_id = ?`,
      [id]
    );
    const variants = (variantRows as any[]).map((v) => ({
      size: v.size,
      color: v.color,
      stock: v.stock,
      sku: v.sku,
    }));

    // 7. Gợi ý sản phẩm cùng category (might like)
    let mightLike: any[] = [];
    try {
      const [suggestedRows] = await db.execute(
        `SELECT 
      p.id, p.title, p.price, p.salePrice, p.saleOff
     FROM products p
     WHERE p.category_id = ? AND p.id != ?
     ORDER BY RAND()
     LIMIT 8`,
        [product.category_id, product.id]
      );
      mightLike = suggestedRows as any[];
    } catch (err) {
      console.warn("Không thể truy vấn sản phẩm gợi ý:", err);
    }

    // 8. Trả về kết quả
    res.status(200).json({
      ...product,
      productSizes,
      allSizes,
      colors: colorRows,
      // images,
      variants,
      mightLike,
    });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
