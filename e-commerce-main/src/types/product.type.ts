export type ProductCard = {
  id: number;
  img: string;
  title: string;
  rating: number;
  price: number;
  salePrice: number;
  saleOff: number;
  top_sell?: true;
  new_arrivals?: true;
  style: string;
  size: string;
};
