export interface CartProduct {
  cart_id: number;
  product_id: string;
  title: string;
  image?: string | null;
  color_id: number;
  color: string;
  code: string;
  size_id: number;
  size: string;
  quantity: number;
  price: number;
  sale_price?: number;
}
