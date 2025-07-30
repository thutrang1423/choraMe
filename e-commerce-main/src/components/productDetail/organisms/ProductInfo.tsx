import { Typography } from "@mui/material";
import PriceInfo from "../../commonProduct/PriceInfo";
import SizeSelector from "../molecules/SizeSelector";
import ColorSelector from "../molecules/ColorSelector";
import QuantitySelector from "../molecules/QuantitySelector";
import RoundedButton from "../../common/RoundedButton";
import { Product as ProductType } from "../../../types/product.type";

interface ProductInfoProps {
  product: ProductType | null;
  selectedSize: string | null;
  setSelectedSize: (size: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const ProductInfo = ({
  product,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
}: ProductInfoProps) => {
const handleDecrease = () => setQuantity(quantity > 0 ? quantity - 1 : 0);
const handleIncrease = () => setQuantity(quantity + 1);

  return (
    <div className="flex-1 max-w-[550px]">
      <Typography variant="h4" className="mb-2 font-semibold">
        {product?.title || "Tên sản phẩm"}
      </Typography>

      <PriceInfo
        price={product?.price}
        salePrice={product?.salePrice}
        saleOff={product?.saleOff}
      />

      <SizeSelector
        sizes={product?.allSizes || []}
        availableSizes={product?.productSizes || []}
        selectedSize={selectedSize}
        onSelect={setSelectedSize}
      />

      <ColorSelector
        colors={product?.colors || []}
        selectedColorId={undefined} // hoặc truyền prop nếu có logic chọn màu
        onSelect={() => {}}
      />

      <div className="mt-6 flex items-center gap-4">
        <QuantitySelector
          quantity={quantity}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
        />

        <RoundedButton
          onClick={() => console.log("Add to cart", { product, quantity })}
          backgroundColor="#fd541b"
          hoverBackgroundColor="#fc0c04"
          color="#fff"
          hoverColor="#fff"
          borderRadius
          sx={{ padding: "10px 24px", fontWeight: 600 }}
        >
          Thêm vào giỏ hàng
        </RoundedButton>
      </div>
    </div>
  );
};

export default ProductInfo;
