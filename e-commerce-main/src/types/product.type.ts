export type Product = {
  id: string;
  title: string;
  created_at: string;
  category_id: string;

  price?: number;
  salePrice?: number;
  saleOff?: number;

  detail?: {
    des: string;
    brand: string;
    material: string;
    origin: string;
    gender: string;
    season: string;
    is_featured: boolean;
  };

  productSizes: string[];
  allSizes?: string[];

  sizes?: {
    id: number;
    name: string;
  }[];

  colors: {
    id: number;
    name: string;
    slug: string;
    hex_code: string;
  }[];

  variants?: {
    size: string;
    color: {
      id: number;
      name: string;
      slug: string;
      hex_code: string;
    };
    stock: number;
    sku?: string;
    price: number;
    sale_off: number;
    sale_price: number;
  }[];

  images?: string[];
  mightLike?: Product[];
};
