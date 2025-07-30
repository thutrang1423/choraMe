import { Tooltip } from "@mui/material";

interface ColorCircleProps {
  colorHex: string;
  colorName?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const ColorCircle = ({
  colorHex,
  colorName,
  isSelected = false,
  onClick,
}: ColorCircleProps) => {
  return (
    <Tooltip title={colorName || ""}>
      <div
        className={`w-6 h-6 rounded-full border cursor-pointer transition duration-200 ${
          isSelected ? "ring-2 ring-offset-2 ring-gray-800" : "border-gray-400"
        }`}
        style={{ backgroundColor: colorHex }}
        onClick={onClick}
      />
    </Tooltip>
  );
};

export default ColorCircle;
