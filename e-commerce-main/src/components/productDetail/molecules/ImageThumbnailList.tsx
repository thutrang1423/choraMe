import { Stack, IconButton } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

interface ImageThumbnailListProps {
  images: string[];
  selectedIndex: number;
  startIndex: number;
  maxVisible?: number;
  onSelect: (index: number) => void;
  onScroll: (direction: "up" | "down") => void;
}

const ImageThumbnailList = ({
  images,
  selectedIndex,
  startIndex,
  maxVisible = 5,
  onSelect,
  onScroll,
}: ImageThumbnailListProps) => {
  return (
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
              selectedIndex === actualIndex
                ? "border-gray-800"
                : "border-gray-300"
            }`}
            onClick={() => onSelect(actualIndex)}
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
  );
};

export default ImageThumbnailList;
