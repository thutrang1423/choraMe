import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchCartItems as fetchCartApi,
  updateCartQuantity as updateCartApi,
  deleteCartItem as deleteCartApi
} from "../../api/cartApi";
import { CartProduct } from "../../types/cart.type";

// Kiểu dữ liệu context
interface CartContextType {
  cartItems: CartProduct[];
  cartQuantity: number;
  fetchCartItems: () => Promise<void>;
  updateCartItemQty: (cartId: number, quantity: number) => Promise<void>;
  deleteCartItemById: (cartId: number) => Promise<void>;
}

// Giá trị mặc định
export const CartContext = createContext<CartContextType>({
  cartItems: [],
  cartQuantity: 0,
  fetchCartItems: async () => {},
  updateCartItemQty: async () => {},
  deleteCartItemById: async () => {}
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);

  const fetchCartItems = async () => {
    try {
      const data = await fetchCartApi();
      setCartItems(data);
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
    }
  };

  const updateCartItemQty = async (cartId: number, quantity: number) => {
    try {
      await updateCartApi(cartId, quantity);
      setCartItems((prev) =>
        prev.map((item) =>
          item.cart_id === cartId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error);
    }
  };

  const deleteCartItemById = async (cartId: number) => {
    try {
      await deleteCartApi(cartId);
      setCartItems((prev) => prev.filter((item) => item.cart_id !== cartId));
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartQuantity,
        fetchCartItems,
        updateCartItemQty,
        deleteCartItemById
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
