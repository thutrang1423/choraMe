import serverInstance from "./axios.config";

// Lấy toàn bộ giỏ hàng
export const fetchCartItems = async () => {
  const res = await serverInstance.get("/cart");
  return res.data; // array CartProduct[]
};

// Thêm sản phẩm vào giỏ
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
  const res = await serverInstance.post("/cart/add", {
    product_id: productId,
    color_id: colorId,
    size_id: sizeId,
    quantity,
  });
  return res.data; // trả về giỏ hàng mới
};

// Xóa sản phẩm
export const deleteCartItem = async (cartId: number) => {
  const res = await serverInstance.delete(`/cart/${cartId}`);
  return res.data; // trả về giỏ hàng mới
};

// Cập nhật số lượng
export const updateCartQuantity = async (cartId: number, quantity: number) => {
  const res = await serverInstance.put(`/cart/${cartId}`, { quantity });
  return res.data; // trả về giỏ hàng mới
};
