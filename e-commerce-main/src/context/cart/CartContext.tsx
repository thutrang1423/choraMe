import { createContext, useContext, useEffect, useState } from "react";
import { fetchCartItems as fetchCartApi } from "../../api/cartApi";
import { CartProduct } from "../../types/cart.type";

// Kiểu dữ liệu context
interface CartContextType {
  cartItems: CartProduct[];
  cartQuantity: number;
  fetchCartItems: () => Promise<void>;
}

// Giá trị mặc định
export const CartContext = createContext<CartContextType>({
  cartItems: [],
  cartQuantity: 0,
  fetchCartItems: async () => {},
});

// Provider
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);

  const fetchCartItems = async () => {
    try {
      const data = await fetchCartApi(); // Gọi API từ cartApi.ts
      setCartItems(data); // Cập nhật giỏ hàng
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
    }
  };

  useEffect(() => {
    fetchCartItems(); // Tự động lấy khi component mount
  }, []);

  // Tổng số lượng sản phẩm
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook để dùng nhanh
export const useCart = () => useContext(CartContext);