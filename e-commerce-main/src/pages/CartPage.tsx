import { Typography } from "@mui/material";
import Breadcrumb from "../components/common/Breadcrumb";
import MainLayout from "../components/layout/MainLayout";

export const CartPage = () => {
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
    </MainLayout>
  );
};
