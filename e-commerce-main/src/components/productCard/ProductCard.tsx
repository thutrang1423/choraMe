import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { Product as ProductType } from "../../types/product.type";
import PriceInfo from "../commonProduct/PriceInfo";

const ProductCard: React.FC<{ product: ProductType }> = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };
  return (
    <Card
      className="col-span-12 md:col-span-3 w-full flex flex-col cursor-pointer hover:shadow-lg transition"
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.images?.[0] || "/default-product.jpg"}
        alt={product.title}
      />
      <CardContent className="flex flex-col gap-2">
        <Typography variant="subtitle1" fontWeight={600}>
          {product.title}
        </Typography>
        {/* ✅ Sử dụng PriceInfo với variants để tự tính giá thấp nhất */}
        <PriceInfo
          variants={product.variants}
          price={product.price}
          salePrice={product.salePrice}
          saleOff={product.saleOff}
          context="card"
        />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
