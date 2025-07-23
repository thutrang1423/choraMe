import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../organisms/Navbar";
import Slices from "../organisms/Slices";
import ProductList from "../organisms/ProductList";
import StylesGrid from "../organisms/StylesGrid";
import ReviewCarousel from "../organisms/ReviewCarousel";
import Footer from "../organisms/Footer";
import WideCard from "../organisms/WideCard";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Slices />

      {/* Thẻ quảng bá dịch vụ Personal Color */}
      <WideCard
        title="Dịch vụ Phân tích Personal Color"
        description="Khám phá màu sắc phù hợp với bạn để nâng tầm phong cách thời trang. 20k/1 bức ảnh chân dung của bạn"
        buttonLabel="Bắt đầu phân tích"
        navigateTo="/personalColor"
      />

      {/* Danh sách sản phẩm */}
      <ProductList />

      {/* Danh mục sản phẩm theo loại */}
      {/* <StylesGrid /> */}

      {/* Đánh giá từ khách hàng */}
      <ReviewCarousel />

      <Footer />
    </>
  );
};

export default HomePage;
