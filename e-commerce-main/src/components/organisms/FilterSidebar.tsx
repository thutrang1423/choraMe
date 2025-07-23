import React from "react";
import { Box, Chip, Slider, Typography } from "@mui/material";
import RoundedButton from "../atoms/RoundedButton";
import PersonalColorFilter from "../../shared/personalColor/PersonalColorFilter";
import { Season, Subtone, DominantFeature } from "../../shared/personalColor/personalColor.type";

interface FilterSidebarProps {
  season: Season | 'default';
  subtone: Subtone | 'default';
  dominant: DominantFeature | 'default';
  selectedStyleSlugs: string[];
  selectedSizes: string[];
  priceRange: number[];
  onChangeSeason: (value: Season) => void;
  onChangeSubtone: (value: Subtone) => void;
  onChangeDominant: (value: DominantFeature) => void;
  onToggleStyle: (slug: string) => void;
  onToggleSize: (size: string) => void;
  onChangePriceRange: (range: number[]) => void;
  onApplyFilters: () => void;
}

const sizeOptions = [
  { label: "XX-small", value: "XXS" },
  { label: "X-small", value: "XS" },
  { label: "Small", value: "S" },
  { label: "Medium", value: "M" },
  { label: "Large", value: "L" },
  { label: "X-Large", value: "XL" },
  { label: "XX-Large", value: "XXL" },
  { label: "3X-Large", value: "XXXL" },
  { label: "4X-Large", value: "XXXXL" },
];

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  season,
  subtone,
  dominant,
  selectedStyleSlugs,
  selectedSizes,
  priceRange,
  onChangeSeason,
  onChangeSubtone,
  onChangeDominant,
  onToggleStyle,
  onToggleSize,
  onChangePriceRange,
  onApplyFilters,
}) => {
  return (
    <div className="col-span-1 flex flex-col gap-6 bg-white shadow rounded-lg p-4">
      <PersonalColorFilter
        season={season}
        subtone={subtone}
        dominant={dominant}
        selectedStyleSlugs={selectedStyleSlugs}
        onChangeSeason={onChangeSeason}
        onChangeSubtone={onChangeSubtone}
        onChangeDominant={onChangeDominant}
        onToggleStyle={onToggleStyle}
      />

      {/* Price Range */}
      <Box className="flex flex-col gap-2">
        <Typography variant="subtitle2">Giá sản phẩm (VND)</Typography>
        <Slider
          value={priceRange}
          onChange={(_, newValue) => onChangePriceRange(newValue as number[])}
          min={0}
          max={10000000}
          step={50000}
          valueLabelDisplay="auto"
        />
        <Typography variant="body2">
          Từ {priceRange[0].toLocaleString("vi-VN")}₫ đến{" "}
          {priceRange[1].toLocaleString("vi-VN")}₫
        </Typography>
      </Box>

      {/* Sizes */}
      <div className="flex flex-wrap gap-2">
        {sizeOptions.map(({ label, value }) => {
          const isSelected = selectedSizes.includes(value);
          return (
            <Chip
              key={value}
              label={label}
              clickable
              onClick={() => onToggleSize(value)}
              variant={isSelected ? "filled" : "outlined"}
              sx={
                isSelected
                  ? {
                      backgroundColor: "#3b696d",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#497275" },
                    }
                  : {}
              }
            />
          );
        })}
      </div>

      {/* Apply Button */}
      <RoundedButton
        onClick={onApplyFilters}
        backgroundColor="#3b696d"
        hoverBackgroundColor="#497275"
        color="#fff"
        borderRadius
        sx={{ width: "100%" }}
      >
        Áp dụng chọn lọc
      </RoundedButton>
    </div>
  );
};

export default FilterSidebar;
