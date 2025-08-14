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
import { useCart } from "../context/cart/CartContext";
import { CartProduct } from "../types/cart.type";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, fetchCartItems, updateCartItemQty, deleteCartItemById } =
    useCart();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  useEffect(() => {
    const newSelected = cartItems.map((item) => item.cart_id);

    // So sánh 2 mảng đơn giản: cùng độ dài và phần tử tương ứng giống nhau
    const isSame =
      selectedItems.length === newSelected.length &&
      selectedItems.every((id, idx) => id === newSelected[idx]);

    if (!isSame) {
      setSelectedItems(newSelected);
    }
  }, [cartItems, selectedItems]);

  const handleQuantityChange = async (cartId: number, newQty: number) => {
    await updateCartItemQty(cartId, newQty);
  };

  const handleDelete = async (cartId: number) => {
    await deleteCartItemById(cartId);
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
  (sum, item) =>
    sum +
    (item.sale_price !== undefined ? item.sale_price : item.price) *
      item.quantity,
  0
);

const totalDiscount = totalOriginal - totalSale;
const totalQuantity = selectedCartItems.reduce((sum, item) => sum + item.quantity, 0); // LƯU Ý sửa đây

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
        {/* Danh sách sản phẩm */}
        <Box className="lg:col-span-3 space-y-4">
          {cartItems.map((item: CartProduct) => (
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
              {/* <Checkbox
                className="absolute top-2 left-2"
                disableRipple
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
              /> */}

              <CardMedia
                component="img"
                image={
                  // Ưu tiên lấy image từ product nếu có, nếu không thì lấy trực tiếp từ item.image
                  item.image || item.image || "/default-product.jpg"
                }
                alt={item.title || item.title || "Sản phẩm"}
                sx={{
                  width: 96,
                  height: 96,
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginLeft: 6,
                }}
                onClick={() => navigate(`/products/${item.product_id}`)}
              />

              <CardContent sx={{ flex: 1 }}>
                <Typography fontWeight={600}>
                  {item.title || item.title || "Không có tên sản phẩm"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Màu: {item.color} | Size: {item.size}
                </Typography>
                <Typography color="error" fontWeight={500}>
                  {formatPrice(item.sale_price ?? item.price)}
                </Typography>
                {item.sale_price !== undefined && (
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: "line-through" }}
                  >
                    {formatPrice(item.price)}
                  </Typography>
                )}
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

        {/* Tổng kết */}
        <Box
          className="border lg:col-span-2 p-4 rounded space-y-3 bg-gray-50"
          sx={{
            position: "sticky",
            top: 100,
            height: "fit-content",
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
          <Box className="flex justify-between text-sm text-gray-500">
            <span>Tổng số lượng:</span>
            <span>{totalQuantity}</span>
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
