import { Box, Typography } from "@mui/material";

interface PriceInfoProps {
  price?: number;
  salePrice?: number;
  saleOff?: number;
}

const PriceInfo: React.FC<PriceInfoProps> = ({ price, salePrice, saleOff }) => {
  const formatPrice = (value?: number) => {
    return typeof value === "number" ? `${value.toLocaleString("vi-VN")}₫` : "";
  };

  const isOnSale = typeof saleOff === "number" && saleOff > 0;

  return (
    <Box className="flex items-center gap-2">
      {price && (
        <Typography
          variant="body1"
          sx={{ textDecoration: isOnSale ? "line-through" : "none", color: isOnSale ? undefined : "black" }}
        >
          {formatPrice(price)}
        </Typography>
      )}

      {isOnSale && salePrice !== undefined && (
        <Typography variant="body1" color="error">
          {formatPrice(salePrice)}
        </Typography>
      )}

      {isOnSale && (
        <Typography variant="body2" color="green">
          -{saleOff}%
        </Typography>
      )}
    </Box>
  );
};

export default PriceInfo;
