import { Typography } from "@mui/material";
import PriceInfo from "../../commonProduct/PriceInfo";
import SizeSelector from "../molecules/SizeSelector";
import ColorSelector from "../molecules/ColorSelector";
import QuantitySelector from "../molecules/QuantitySelector";
import RoundedButton from "../../common/RoundedButton";
import { Product as ProductType } from "../../../types/product.type";

import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authen/AuthContext";
import { CartContext } from "../../../context/cart/CartContext";
import serverInstance from "../../../config/axios.config";
import { toast } from "react-toastify";

interface ProductInfoProps {
  product: ProductType | null;
  selectedSize: string | null;
  setSelectedSize: (size: string | null) => void;
  selectedColorId: string | null;
  setSelectedColorId: (id: string | null) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const ProductInfo = ({
  product,
  quantity,
  setQuantity,
  selectedSize,
  setSelectedSize,
  selectedColorId,
  setSelectedColorId,
}: ProductInfoProps) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { fetchCartItems } = useContext(CartContext);

  const availableSizes = useMemo(() => {
    if (!product?.variants || !selectedColorId) return [];
    return product.variants
      .filter((v) => String(v.color.id) === String(selectedColorId))
      .map((v) => v.size);
  }, [product?.variants, selectedColorId]);

  const handleDecrease = () => setQuantity(quantity > 0 ? quantity - 1 : 0);
  const handleIncrease = () => setQuantity(quantity + 1);

  const handleAddToCart = async () => {
    if (!currentUser) return navigate("/login");

    const selectedSizeObj = product?.sizes?.find(
      (s) => s.name === selectedSize
    );
    const sizeId = selectedSizeObj?.id;

    if (!selectedColorId || !sizeId) {
      return toast.warning("Vui lòng chọn đầy đủ màu và size!");
    }

    try {
      await serverInstance.post("/cart/add", {
        product_id: product?.id,
        color_id: Number(selectedColorId),
        size_id: sizeId,
        quantity,
      });

      toast.success("Đã thêm vào giỏ hàng!");

      // ✅ Cập nhật giỏ hàng trong context (navbar sẽ hiển thị lại số lượng)
      if (fetchCartItems) {
        await fetchCartItems();
      }
    } catch (error) {
      console.error("Add to cart error", error);
      toast.error("Lỗi khi thêm vào giỏ hàng!");
    }
  };

  return (
    <div className="flex-1 max-w-[550px]">
      <Typography variant="h4" className="mb-2 font-semibold">
        {product?.title || "Tên sản phẩm"}
      </Typography>

      <PriceInfo
        variants={product?.variants}
        selectedColorId={selectedColorId}
        selectedSize={selectedSize}
        context="detail"
      />

      <ColorSelector
        colors={product?.colors || []}
        selectedColorId={selectedColorId || undefined}
        onSelect={(id) => {
          setSelectedColorId(id);

          const sizesForColor = product?.variants
            ?.filter((v) => String(v.color.id) === String(id))
            .map((v) => v.size);

          if (sizesForColor && sizesForColor.length > 0) {
            setSelectedSize(sizesForColor[0]);
          } else {
            setSelectedSize(null);
          }
        }}
      />

      <SizeSelector
        allSizes={product?.allSizes || []}
        availableSizes={availableSizes}
        selectedSize={selectedSize}
        onSelect={setSelectedSize}
      />

      <div className="mt-6 flex items-center gap-4">
        <QuantitySelector
          quantity={quantity}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
        />

        <RoundedButton
          onClick={handleAddToCart}
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
