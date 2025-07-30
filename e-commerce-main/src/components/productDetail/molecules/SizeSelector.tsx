import RoundedButton from "../../common/RoundedButton";

interface SizeSelectorProps {
  sizes: string[];
  availableSizes: string[];
  selectedSize: string | null;
  onSelect: (size: string) => void;
}

const SizeSelector = ({
  sizes,
  availableSizes,
  selectedSize,
  onSelect,
}: SizeSelectorProps) => {
  return (
    <div className="flex gap-2 flex-wrap items-center text-base font-medium mt-4">
      <span>Size:</span>
      {sizes.length ? (
        sizes.map((size) => {
          const isAvailable = availableSizes.includes(size);
          const isSelected = size === selectedSize;

          return (
            <RoundedButton
              key={size}
              onClick={() => isAvailable && onSelect(size)}
              backgroundColor={
                isSelected && isAvailable ? "#ebaa43" : "#f3f4f6"
              }
              hoverBackgroundColor={isAvailable ? "#e9b666" : "#f3f4f6"}
              color={isSelected && isAvailable ? "#fff" : "#4b5563"}
              hoverColor={isSelected && isAvailable ? "#fff" : "#374151"}
              border
              sx={{
                opacity: isAvailable ? 1 : 0.4,
                cursor: isAvailable ? "pointer" : "not-allowed",
                fontWeight: isSelected ? 600 : 400,
                fontSize: "14px",
                padding: "4px 16px",
              }}
            >
              {size}
            </RoundedButton>
          );
        })
      ) : (
        <span className="text-gray-500 ml-2">Chưa có size</span>
      )}
    </div>
  );
};

export default SizeSelector;
