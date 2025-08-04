import RoundedButton from "../../common/RoundedButton";

interface SizeSelectorProps {
  allSizes: string[]; // Tất cả các size trong hệ thống (dù còn hàng hay không)
  availableSizes: string[]; // Các size có hàng theo màu đang chọn
  selectedSize: string | null;
  onSelect: (size: string) => void;
}

const SizeSelector = ({
  allSizes,
  availableSizes,
  selectedSize,
  onSelect,
}: SizeSelectorProps) => {
  return (
    <div className="flex gap-2 flex-wrap items-center text-base font-medium mt-4">
      <span>Size:</span>
      {allSizes.length ? (
        allSizes.map((size) => {
          const isAvailable = availableSizes.includes(size);
          const isSelected = size === selectedSize;

          return (
            <RoundedButton
              key={size}
              onClick={() => isAvailable && onSelect(size)}
              backgroundColor={isSelected ? "#ebaa43" : "#f3f4f6"}
              hoverBackgroundColor={isSelected ? "#e9b666" : "#f3f4f6"}
              color={isSelected ? "#fff" : isAvailable ? "#4b5563" : "#9ca3af"}
              hoverColor={
                isSelected ? "#fff" : isAvailable ? "#374151" : "#9ca3af"
              }
              border
              sx={{
                fontWeight: isSelected ? 600 : 400,
                fontSize: "14px",
                padding: "4px 16px",
                opacity: isAvailable ? 1 : 0.5,
                cursor: isAvailable ? "pointer" : "not-allowed",
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
