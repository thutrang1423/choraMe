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
    </MainLayout>
  );
};
