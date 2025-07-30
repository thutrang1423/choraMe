import { Stack, IconButton } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

interface Props {
  images: string[];
  selectedImageIndex: number;
  startIndex: number;
  onImageSelect: (index: number) => void;
  onScroll: (direction: "up" | "down") => void;
}

const ProductImages = ({
  images,
  selectedImageIndex,
  startIndex,
  onImageSelect,
  onScroll,
}: Props) => {
  const maxVisible = 5;

  return (
    <div className="flex flex-row gap-4 flex-1 items-start">
      <Stack spacing={1} alignItems="center">
        <IconButton
          size="small"
          onClick={() => onScroll("up")}
          disabled={startIndex === 0}
        >
          <KeyboardArrowUp />
        </IconButton>

        {images.slice(startIndex, startIndex + maxVisible).map((img, idx) => {
          const actualIndex = startIndex + idx;
          return (
            <img
              key={actualIndex}
              src={img}
              alt={`thumb-${actualIndex}`}
              className={`w-[100px] h-[80px] object-cover rounded cursor-pointer border ${
                selectedImageIndex === actualIndex
                  ? "border-gray-800"
                  : "border-gray-300"
              }`}
              onClick={() => onImageSelect(actualIndex)}
            />
          );
        })}

        <IconButton
          size="small"
          onClick={() => onScroll("down")}
          disabled={startIndex + maxVisible >= images.length}
        >
          <KeyboardArrowDown />
        </IconButton>
      </Stack>

      <img
        src={images[selectedImageIndex]}
        alt="main"
        className="w-full md:w-[600px] h-[500px] object-cover rounded-lg shadow-md"
      />
    </div>
  );
};

export default ProductImages;
