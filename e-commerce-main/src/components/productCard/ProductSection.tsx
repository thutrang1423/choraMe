import { useEffect, useState } from "react";
import { Card, Typography, CircularProgress, Box } from "@mui/material";
import ProductCard from "./ProductCard";
import RoundedButton from "../common/RoundedButton";
import { Product as ProductType } from "../../types/product.type";

type ProductSectionProps = {
  title: string;
  endpoint?: string;
  products?: ProductType[];
};

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  endpoint,
  products: externalProducts,
}) => {
  const [products, setProducts] = useState<ProductType[]>(
    externalProducts || []
  );
  const [loading, setLoading] = useState(endpoint ? true : false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!endpoint) return;
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:3000${endpoint}`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Lỗi fetch sản phẩm: ", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [endpoint]);

  useEffect(() => {
    if (externalProducts) {
      setProducts(externalProducts);
    }
  }, [externalProducts]);

  const visibleProducts = showAll ? products : products.slice(0, 4);

  if (loading) {
    return (
      <Box className="col-span-12 w-full py-8 flex justify-center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Card className="col-span-12 w-full p-4">
        <Typography variant="h3" align="center" color="#4f5151">
          {title}
        </Typography>
      </Card>

      {visibleProducts.length === 0 ? (
        <Typography align="center" className="w-full text-gray-500 py-8">
          Không có sản phẩm để hiển thị
        </Typography>
      ) : (
        visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}

      {products.length > 4 && (
        <Card
          className="col-span-12 w-full p-4"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <RoundedButton
            onClick={() => setShowAll((prev) => !prev)}
            backgroundColor="#f7f0e5"
            color="#4f5151"
            hoverBackgroundColor="#eccea0"
            hoverColor="#4f5151"
          >
            {showAll ? "Ẩn bớt" : "Xem tất cả"}
          </RoundedButton>
        </Card>
      )}
    </>
  );
};

export default ProductSection;
