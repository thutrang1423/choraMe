import { Button } from "@mui/material";
import { SxProps } from "@mui/system";

interface QuantityButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  sx?: SxProps;
}

const QuantityButton = ({
  label,
  onClick,
  disabled,
  sx,
}: QuantityButtonProps) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      disabled={disabled}
      sx={{
        minWidth: "40px",
        height: "40px",
        borderColor: "#d1d5db",
        color: "#374151",
        fontWeight: 500,
        ...sx,
      }}
      className="hover:bg-gray-100 transition rounded-md"
    >
      {label}
    </Button>
  );
};

export default QuantityButton;
