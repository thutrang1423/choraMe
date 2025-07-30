export type Product = {
  id: string;
  title: string;
  price: number;
  salePrice: number;
  saleOff: number;
  created_at: string;
  category_id: string;

  detail?: {
    des: string;
    brand: string;
    material: string;
    origin: string;
    gender: string;
    season: string;
    // is_new: boolean;
    is_featured: boolean;
  };

  productSizes: string[];
  allSizes?: string[];

  colors: {
    id: number;
    name: string;
    slug: string;
    hex_code: string;
  }[];

  variants?: {
    size: string;
    color: string;
    stock: number;
    sku?: string;
  }[];

  images?: string[];

  mightLike?: Product[];
};
