import ColorCircle from "../atoms/ColorCircle";

interface Color {
  id: string | number;
  name: string;
  hex_code: string;
}

interface ColorSelectorProps {
  colors: Color[];
  selectedColorId?: string;
  onSelect?: (colorId: string) => void;
}

const ColorSelector = ({
  colors,
  selectedColorId,
  onSelect,
}: ColorSelectorProps) => {
  return (
    <div className="flex items-center gap-2 text-base font-medium mt-2">
      <span>Màu:</span>
      {colors.length ? (
        colors.map((color) => (
          <ColorCircle
            key={color.id}
            colorHex={color.hex_code}
            colorName={color.name}
            isSelected={selectedColorId === String(color.id)}
            onClick={() => onSelect?.(String(color.id))}
          />
        ))
      ) : (
        <span className="text-sm text-gray-500">Chưa có màu</span>
      )}
    </div>
  );
};

export default ColorSelector;
