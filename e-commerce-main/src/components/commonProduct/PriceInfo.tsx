import { Box, Typography } from "@mui/material";

interface Variant {
  size: string;
  color: {
    id: string | number;
    name: string;
    slug: string;
    hex_code: string;
  };
  price: number;
  sale_price: number;
  sale_off: number;
}

interface PriceInfoProps {
  price?: number;
  salePrice?: number;
  saleOff?: number;
  variants?: Variant[];
  selectedSize?: string | null;
  selectedColorId?: string | null;
  context?: "card" | "detail";
}

const PriceInfo: React.FC<PriceInfoProps> = ({
  price,
  salePrice,
  saleOff,
  variants,
  selectedSize,
  selectedColorId,
  context = "card",
}) => {
  const formatPrice = (value?: number) =>
    typeof value === "number" ? `${value.toLocaleString("vi-VN")}₫` : "";

  let displayPrice = price;
  let displaySalePrice = salePrice;
  let displaySaleOff = saleOff;

  if (variants && variants.length > 0) {
    let selectedVariant: Variant | undefined;

    // Nếu đã chọn đầy đủ màu và size, tìm đúng biến thể
    if (selectedSize && selectedColorId) {
      selectedVariant = variants.find(
        (v) =>
          v.size === selectedSize &&
          String(v.color.id) === String(selectedColorId)
      );
    }

    if (selectedVariant) {
      displayPrice = selectedVariant.price;
      displaySalePrice = selectedVariant.sale_price;
      displaySaleOff = selectedVariant.sale_off;
    } else {
      // Nếu chưa chọn đủ hoặc không tìm thấy → fallback giá thấp nhất
      const sorted = [...variants].sort(
        (a, b) => (a.sale_price ?? a.price) - (b.sale_price ?? b.price)
      );
      const cheapest = sorted[0];
      displayPrice = cheapest.price;
      displaySalePrice = cheapest.sale_price;
      displaySaleOff = cheapest.sale_off;
    }
  }

  const isOnSale = typeof displaySaleOff === "number" && displaySaleOff > 0;

  return (
    <Box className="flex items-center gap-2">
      {displayPrice !== undefined && (
        <Typography
          variant="body1"
          sx={{
            textDecoration: isOnSale ? "line-through" : "none",
            color: isOnSale ? undefined : "black",
          }}
        >
          {formatPrice(displayPrice)}
        </Typography>
      )}

      {isOnSale && displaySalePrice !== undefined && (
        <Typography variant="body1" color="error">
          {formatPrice(displaySalePrice)}
        </Typography>
      )}

      {isOnSale && context === "detail" && (
        <Typography variant="body2" color="green">
          -{displaySaleOff}%
        </Typography>
      )}
    </Box>
  );
};

export default PriceInfo;
