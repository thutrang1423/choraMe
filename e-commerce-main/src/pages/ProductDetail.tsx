import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Breadcrumb from "../components/common/Breadcrumb";
import ProductImages from "../components/productDetail/organisms/ProductImages";
import ProductInfo from "../components/productDetail/organisms/ProductInfo";
import TabSection from "../components/productDetail/organisms/TabSection";
import ProductSection from "../components/productCard/ProductSection";
import { Product as ProductType } from "../types/product.type";

import anh1 from "../assets/images/img/9a918d0ef2b813968a914b224dc3cfb9.jpg";
import anh2 from "../assets/images/img/personal-color-anh-bia-1-f3e05c69.jpg";
import anh3 from "../assets/images/img/9a918d0ef2b813968a914b224dc3cfb9.jpg";
import anh4 from "../assets/images/img/a165ba3621c97c11cb643cf7bd1db765.jpg";
import MainLayout from "../components/layout/MainLayout";

const fallbackImages = [anh1, anh2, anh3, anh4, anh1, anh2, anh3, anh4];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [activeTab, setActiveTab] = useState<"detail" | "rating">("detail");

  const images = product?.images?.length ? product.images : fallbackImages;

  const handleImageListScroll = (direction: "up" | "down") => {
    setStartIndex((prev) => {
      const newStart =
        direction === "up"
          ? Math.max(prev - 1, 0)
          : Math.min(prev + 1, images.length - 5);
      setSelectedImageIndex(newStart);
      return newStart;
    });
  };

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product?.productSizes?.length) {
      setSelectedSize(product.productSizes[0]);
    }
  }, [product?.productSizes]);

  return (
    <MainLayout>
      <Breadcrumb
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm", href: "/products" },
          { label: product?.title || "Đang tải..." },
        ]}
      />

      <div className="flex flex-col md:flex-row gap-6 p-4">
        <ProductImages
          images={images}
          selectedImageIndex={selectedImageIndex}
          startIndex={startIndex}
          onImageSelect={handleImageSelect}
          onScroll={handleImageListScroll}
        />
        <ProductInfo
          product={product}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>

      <TabSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        product={product}
      />

      <div className="grid grid-cols-12 gap-4 p-4">
          <ProductSection
            title="Bạn có thể cũng thích"
            products={product?.mightLike}
          />
        </div>
    </MainLayout>
  );
};

export default ProductDetail;
