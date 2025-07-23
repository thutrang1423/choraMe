import { useNavigate } from "react-router-dom"; // ✅ THÊM
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { ProductCard as ProductType } from "../../types/product.type";
import PriceInfo from "../atoms/PriceInfo";

const ProductCard: React.FC<{ product: ProductType }> = ({ product }) => {
  const navigate = useNavigate(); // ✅ HOOK ĐIỀU HƯỚNG

  const handleClick = () => {
    navigate(`/products/${product.id}`); // ✅ ĐIỀU HƯỚNG KHI CLICK
  };

  return (
    <Card
      className="col-span-12 md:col-span-3 w-full flex flex-col cursor-pointer hover:shadow-lg transition"
      onClick={handleClick} // ✅ GÁN SỰ KIỆN CLICK
    >
      <CardMedia
        component="img"
        height="200"
        image={product.img}
        alt={product.title}
      />
      <CardContent className="flex flex-col gap-2">
        <Typography variant="subtitle1" fontWeight={600}>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Đánh giá: {product.rating} / 5
        </Typography>
        <PriceInfo
          price={product.price}
          salePrice={product.salePrice}
          saleOff={product.saleOff}
        />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
