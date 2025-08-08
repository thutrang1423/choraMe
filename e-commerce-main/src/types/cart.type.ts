export interface CartProduct {
  id: number;
  product: {
    id: number;
    title: string;
    image: string;
  };
  color: {
    id: number;
    name: string;
    code: string;
  };
  size: {
    id: number;
    name: string;
  };
  quantity: number;
}
