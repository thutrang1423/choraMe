import db from "../../config/db";
import { Request, Response } from "express";

// GET PRODUCTS WITH ADVANCED FILTER
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { season, sizes, price_gte, price_lte, category } = req.query;

    let query = `
      SELECT 
        p.id, p.title, p.created_at, p.category_id,
        MIN(pv.price) AS price,
        MIN(CASE WHEN pv.sale_price IS NOT NULL THEN pv.sale_price ELSE pv.price END) AS salePrice,
        MAX(pv.sale_off) AS saleOff
      FROM products p
      JOIN product_variants pv ON p.id = pv.product_id
      JOIN sizes s ON pv.size_id = s.id
      JOIN product_detail d ON p.id = d.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (sizes) {
      const sizeArray = (sizes as string).split(",");
      query += ` AND s.name IN (${sizeArray.map(() => "?").join(",")})`;
      params.push(...sizeArray);
    }

    if (price_gte) {
      query += ` AND pv.price >= ?`;
      params.push(price_gte);
    }

    if (price_lte) {
      query += ` AND pv.price <= ?`;
      params.push(price_lte);
    }

    if (season) {
      query += ` AND d.season = ?`;
      params.push(season);
    }

    if (category) {
      const [categoryRows] = await db.execute(
        "SELECT id FROM category WHERE slug = ?",
        [category]
      );
      if (!Array.isArray(categoryRows) || categoryRows.length === 0) {
        return res.status(404).json({ error: "Category not found" });
      }
      query += ` AND p.category_id = ?`;
      params.push((categoryRows[0] as any).id);
    }

    query += ` GROUP BY p.id`;

    const [rows] = await db.execute(query, params);
    res.status(200).json(rows);
  } catch (err) {
    console.error("Lỗi lọc sản phẩm:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
};

// GET TOP SALE PRODUCTS
export const getProductsSaleOffTop = async (_: Request, res: Response) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        p.id, p.title, p.created_at,
        MIN(pv.price) AS price,
        MIN(CASE WHEN pv.sale_price IS NOT NULL THEN pv.sale_price ELSE pv.price END) AS salePrice,
        MAX(pv.sale_off) AS saleOff
      FROM products p
      JOIN product_variants pv ON p.id = pv.product_id
      WHERE pv.sale_off > 0
      GROUP BY p.id
      ORDER BY saleOff DESC
      LIMIT 16
    `);
    res.status(200).json(rows);
  } catch (err) {
    console.error("Lỗi sản phẩm sale:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
};

// GET NEW ARRIVAL PRODUCTS
export const getProductsNewArrivals = async (_: Request, res: Response) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        p.id, p.title, p.created_at,
        MIN(pv.price) AS price,
        MIN(CASE WHEN pv.sale_price IS NOT NULL THEN pv.sale_price ELSE pv.price END) AS salePrice,
        MAX(pv.sale_off) AS saleOff
      FROM products p
      JOIN product_variants pv ON p.id = pv.product_id
      GROUP BY p.id
      ORDER BY p.created_at DESC
      LIMIT 16
    `);
    res.status(200).json(rows);
  } catch (err) {
    console.error("Lỗi sản phẩm mới về:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
};

// GET PRODUCTS BY CATEGORY SLUG
export const getCategoryProducts = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const [categories] = await db.execute(
      "SELECT id FROM category WHERE slug = ?",
      [slug]
    );
    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    const [products] = await db.execute(
      `
      SELECT 
        p.id, p.title, p.created_at,
        MIN(pv.price) AS price,
        MIN(CASE WHEN pv.sale_price IS NOT NULL THEN pv.sale_price ELSE pv.price END) AS salePrice,
        MAX(pv.sale_off) AS saleOff
      FROM products p
      JOIN product_variants pv ON p.id = pv.product_id
      WHERE p.category_id = ?
      GROUP BY p.id
    `,
      [(categories[0] as any).id]
    );

    res.status(200).json(products);
  } catch (err) {
    console.error("Lỗi lấy theo category:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
};

// GET SINGLE PRODUCT
export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // 1. Lấy thông tin sản phẩm chính + chi tiết
    const [productRows] = await db.execute(
      `
      SELECT p.*, d.des, d.brand, d.material, d.origin, d.gender, d.season, d.is_featured
      FROM products p
      LEFT JOIN product_detail d ON p.id = d.id
      WHERE p.id = ?
    `,
      [id]
    );

    if (!Array.isArray(productRows) || productRows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const raw = productRows[0] as any;

    const product = {
      id: raw.id,
      title: raw.title,
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
            is_featured: !!raw.is_featured,
          }
        : undefined,
    };

    // 2. Lấy biến thể sản phẩm
    const [variantRows] = await db.execute(
      `
      SELECT 
        s.name AS size, 
        c.id AS color_id,
        c.name AS color_name, 
        c.slug AS color_slug, 
        c.hex_code AS color_hex,
        pv.stock, pv.sku, pv.price, pv.sale_off, pv.sale_price
      FROM product_variants pv
      JOIN sizes s ON pv.size_id = s.id
      JOIN colors c ON pv.color_id = c.id
      WHERE pv.product_id = ?
    `,
      [id]
    );

    const variants = (variantRows as any[]).map((v) => ({
      size: v.size,
      color: {
        id: v.color_id,
        name: v.color_name,
        slug: v.color_slug,
        hex_code: v.color_hex,
      },
      stock: v.stock,
      sku: v.sku,
      price: v.price,
      sale_off: v.sale_off,
      sale_price: v.sale_price,
    }));

    // 3. Tính toán giá sản phẩm
    let price = null;
    let salePrice = null;
    let saleOff = 0;

    if (variants.length > 0) {
      price = Math.min(...variants.map((v) => v.price));
      salePrice = Math.min(...variants.map((v) => v.sale_price ?? v.price));
      saleOff = Math.max(...variants.map((v) => v.sale_off ?? 0));
    }

    // 4. Lấy danh sách size sản phẩm (tên)
    const productSizes = [...new Set(variants.map((v) => v.size))];

    // 5. Lấy danh sách size hệ thống (name → id)
    const [sizeIdRows] = await db.execute(
      "SELECT id, name FROM sizes ORDER BY id ASC"
    );
    const sizes = (sizeIdRows as any[]).map((s) => ({
      id: s.id,
      name: s.name,
    }));

    // 6. Lấy danh sách màu sản phẩm
    const colorMap = new Map();
    variants.forEach((v) => {
      if (!colorMap.has(v.color.id)) {
        colorMap.set(v.color.id, v.color);
      }
    });
    const colors = [...colorMap.values()];

    // 7. Lấy danh sách sản phẩm cùng danh mục (mightLike)
    const [mightLike] = await db.execute(
      `
  SELECT 
    p.id, 
    p.title,
    MIN(pv.price) AS price,
    MIN(CASE WHEN pv.sale_price IS NOT NULL THEN pv.sale_price ELSE pv.price END) AS salePrice,
    MAX(pv.sale_off) AS saleOff
  FROM products p
  JOIN product_variants pv ON p.id = pv.product_id
  WHERE p.category_id = ? AND p.id != ?
  GROUP BY p.id
  ORDER BY RAND()
  LIMIT 8
  `,
      [product.category_id, product.id]
    );

    // 8. Trả về kết quả
    res.status(200).json({
      ...product,
      price,
      salePrice,
      saleOff,
      productSizes,
      allSizes: sizes.map((s) => s.name),
      sizes, // để tìm được id từ tên size khi thêm vào cart
      colors,
      variants,
      mightLike,
    });
  } catch (err) {
    console.error("Lỗi khi lấy sản phẩm:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
};
