import serverInstance from "../config/axios.config"; // ✅ dùng 1 instance duy nhất

export const fetchCartItems = async () => {
  const res = await serverInstance.get("/cart");
  return res.data;
};

export const addToCart = async ({
  productId,
  colorId,
  sizeId,
  quantity,
}: {
  productId: number;
  colorId: number;
  sizeId: number;
  quantity: number;
}) => {
  await serverInstance.post("/cart/add", {
    product_id: productId,
    color_id: colorId,
    size_id: sizeId,
    quantity,
  });
};

export const deleteCartItem = async (cartId: string) => {
  const res = await serverInstance.delete(`/cart/${cartId}`);
  return res.data;
};

export const updateCartQuantity = async (cartId: string, quantity: number) => {
  const res = await serverInstance.put(`/cart/${cartId}`, { quantity });
  return res.data;
};
