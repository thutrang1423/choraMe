import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Breadcrumb from "../components/common/Breadcrumb";
import MainLayout from "../components/layout/MainLayout";
import QuantitySelector from "../components/productDetail/molecules/QuantitySelector";
import { useEffect, useState } from "react";
import { fetchCartItems } from "../config/api/cartApi";

interface CartItem {
  cart_id: string;
  product_id: string;
  title: string;
  image: string;
  color: string;
  hex_code: string;
  size: string;
  price: number;
  sale_price: number;
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await fetchCartItems();
        setCartItems(data);
        setSelectedItems(data.map((item: CartItem) => item.cart_id));
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
      }
    };
    loadCart();
  }, []);

  const handleQuantityChange = (id: string, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.cart_id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.cart_id !== id));
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    // TODO: gọi API xóa giỏ hàng ở backend nếu cần
  };

  const formatPrice = (val: number) => `${val.toLocaleString("vi-VN")}₫`;

  const selectedCartItems = cartItems.filter((item) =>
    selectedItems.includes(item.cart_id)
  );

  const totalOriginal = selectedCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalSale = selectedCartItems.reduce(
    (sum, item) => sum + item.sale_price * item.quantity,
    0
  );
  const totalDiscount = totalOriginal - totalSale;

  return (
    <MainLayout>
      <Breadcrumb
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Giỏ hàng", href: "/cart" },
        ]}
      />
      <Typography variant="h3" margin="20px" color="#4f5151">
        Giỏ hàng của bạn
      </Typography>

      <Box className="p-4 grid grid-cols-1 lg:grid-cols-6 gap-10">
        {/* Danh sách sản phẩm trong giỏ */}
        <Box className="lg:col-span-3 space-y-4">
          {cartItems.map((item) => (
            <Card
              key={item.cart_id}
              className="relative border p-2 shadow-sm"
              sx={{
                display: "flex",
                position: "relative",
                paddingRight: 10,
                minHeight: 120,
              }}
            >
              <Checkbox
                className="absolute top-2 left-2"
                disableRipple
                sx={{
                  padding: 0,
                  "& .MuiTouchRipple-root": { display: "none" },
                  "&:hover": { backgroundColor: "transparent" },
                }}
                checked={selectedItems.includes(item.cart_id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedItems((prev) => [...prev, item.cart_id]);
                  } else {
                    setSelectedItems((prev) =>
                      prev.filter((id) => id !== item.cart_id)
                    );
                  }
                }}
              />

              <CardMedia
                component="img"
                image={item.image || "/default-product.jpg"}
                alt={item.title}
                sx={{
                  width: 96,
                  height: 96,
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginLeft: 6,
                }}
              />

              <CardContent sx={{ flex: 1 }}>
                <Typography fontWeight={600}>{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Màu: {item.color} | Size: {item.size}
                </Typography>
                <Typography color="error" fontWeight={500}>
                  {formatPrice(item.sale_price)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textDecoration: "line-through" }}
                >
                  {formatPrice(item.price)}
                </Typography>
              </CardContent>

              <IconButton
                sx={{ position: "absolute", top: 8, right: 8 }}
                onClick={() => handleDelete(item.cart_id)}
              >
                <DeleteIcon color="error" />
              </IconButton>

              <Box sx={{ position: "absolute", bottom: 8, right: 8 }}>
                <QuantitySelector
                  quantity={item.quantity}
                  onIncrease={() =>
                    handleQuantityChange(item.cart_id, item.quantity + 1)
                  }
                  onDecrease={() =>
                    handleQuantityChange(
                      item.cart_id,
                      item.quantity > 1 ? item.quantity - 1 : 1
                    )
                  }
                />
              </Box>
            </Card>
          ))}
        </Box>

        {/* Tổng kết đơn hàng */}
        <Box
          className="border lg:col-span-2 p-4 rounded space-y-3 bg-gray-50"
          sx={{
            position: "sticky",
            top: 100,
            height: "fit-content",
            alignSelf: "start",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Tổng giá trị đơn hàng
          </Typography>
          <Box className="flex justify-between">
            <span>Tạm tính:</span>
            <span>{formatPrice(totalOriginal)}</span>
          </Box>
          <Box className="flex justify-between">
            <span>Giảm giá:</span>
            <span className="text-green-600">
              -{formatPrice(totalDiscount)}
            </span>
          </Box>
          <Box className="flex justify-between font-semibold text-lg">
            <span>Tổng cộng:</span>
            <span className="text-red-500">{formatPrice(totalSale)}</span>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, borderRadius: 8, py: 1.5 }}
          >
            Tiến hành thanh toán
          </Button>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default CartPage;
