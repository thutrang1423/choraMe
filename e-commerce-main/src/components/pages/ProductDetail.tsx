import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Breadcrumb from "../atoms/Breadcrumb";
import { ProductCard as ProductType } from "../../types/product.type";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:3000/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);
  return (
    <>
      <Navbar/>
      <Breadcrumb
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm", href: "/products" },
          {
            label: product?.title || "Đang tải...",
          },
        ]}
      />
      <h1 className="text-2xl font-bold mt-4">
        {product?.title || "Đang tải sản phẩm..."}
      </h1>
      {/* Hiển thị thêm thông tin chi tiết nếu muốn */}
      <Footer/>
    </>
  );
};

export default ProductDetail;
