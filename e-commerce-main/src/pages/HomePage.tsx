// src/pages/HomePage.tsx
import React from "react";
import MainLayout from "../components/layout/MainLayout";
import Slices from "../components/slice/Slices";
import ProductList from "../components/productCard/ProductList";
import ReviewCarousel from "../components/home/reviewCard/ReviewCarousel";
import WideCard from "../components/home/WideCard";

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <Slices />
      <WideCard
        title="Dịch vụ Phân tích Personal Color"
        description="Khám phá màu sắc phù hợp với bạn để nâng tầm phong cách thời trang. 20k/1 bức ảnh chân dung của bạn"
        buttonLabel="Bắt đầu phân tích"
        navigateTo="/personalColor"
      />
      <ProductList />
      {/* <StylesGrid /> */}
      <ReviewCarousel />
    </MainLayout>
  );
};

export default HomePage;
