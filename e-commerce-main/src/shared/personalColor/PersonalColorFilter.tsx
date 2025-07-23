import React from 'react';
import { Box, Select, MenuItem, Typography, Chip } from '@mui/material';
import {
  SeasonMap,
  SubtoneMap,
  DominantFeatureMap,
} from '../../shared/personalColor/personalColor.constant';
import { Season, Subtone, DominantFeature } from '../../shared/personalColor/personalColor.type';
import { Styles } from '../../data/stylesData';

interface PersonalColorFilterProps {
  season: Season | 'default';
  subtone: Subtone | 'default';
  dominant: DominantFeature | 'default';
  selectedStyleSlugs: string[];
  onChangeSeason: (value: Season) => void;
  onChangeSubtone: (value: Subtone) => void;
  onChangeDominant: (value: DominantFeature) => void;
  onToggleStyle: (slug: string) => void;
}

const PersonalColorFilter: React.FC<PersonalColorFilterProps> = ({
  season,
  subtone,
  dominant,
  selectedStyleSlugs,
  onChangeSeason,
  onChangeSubtone,
  onChangeDominant,
  onToggleStyle,
}) => {
  const isSeasonSelected = season !== 'default';

  return (
    <div className="flex flex-col gap-4">
      {/* Season */}
      <Box>
        <Typography variant="subtitle2">Mùa</Typography>
        <Select
          fullWidth
          value={season}
          onChange={(e) => onChangeSeason(e.target.value as Season)}
        >
          <MenuItem value="default" disabled>
            Vui lòng chọn kết quả màu sắc cá nhân của bạn
          </MenuItem>
          {Object.entries(SeasonMap).map(([key, label]) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Subtone */}
      <Box>
        <Typography variant="subtitle2">Sắc độ da</Typography>
        <Select
          fullWidth
          value={subtone}
          onChange={(e) => onChangeSubtone(e.target.value as Subtone)}
          disabled={!isSeasonSelected}
        >
          <MenuItem value="default" disabled>
            Vui lòng chọn kết quả màu sắc cá nhân của bạn
          </MenuItem>
          {Object.entries(SubtoneMap).map(([key, label]) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </Select>
        {!isSeasonSelected && (
          <Typography variant="caption" color="error">
            Vui lòng chọn mùa trước khi chọn sắc độ da
          </Typography>
        )}
      </Box>

      {/* Dominant Feature */}
      <Box>
        <Typography variant="subtitle2">Đặc điểm nổi bật</Typography>
        <Select
          fullWidth
          value={dominant}
          onChange={(e) => onChangeDominant(e.target.value as DominantFeature)}
          disabled={!isSeasonSelected}
        >
          <MenuItem value="default" disabled>
            Vui lòng chọn kết quả màu sắc cá nhân của bạn
          </MenuItem>
          {Object.entries(DominantFeatureMap).map(([key, label]) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </Select>
        {!isSeasonSelected && (
          <Typography variant="caption" color="error">
            Vui lòng chọn mùa trước khi chọn đặc điểm nổi bật
          </Typography>
        )}
      </Box>

      {/* Styles */}
      <Box className="flex flex-wrap gap-2">
        {Styles.map((style) => {
          const isSelected = selectedStyleSlugs.includes(style.slug);
          return (
            <Chip
              key={style.id}
              label={style.name}
              clickable={isSeasonSelected}
              onClick={() => {
                if (isSeasonSelected) onToggleStyle(style.slug);
              }}
              variant={isSelected ? 'filled' : 'outlined'}
              sx={
                isSelected
                  ? {
                      backgroundColor: '#3b696d',
                      color: '#fff',
                      '&:hover': { backgroundColor: '#497275' },
                    }
                  : !isSeasonSelected
                    ? { opacity: 0.4, pointerEvents: 'none' }
                    : {}
              }
            />
          );
        })}
      </Box>

      {!isSeasonSelected && (
        <Typography variant="caption" color="error">
          Vui lòng chọn mùa trước khi chọn phong cách
        </Typography>
      )}
    </div>
  );
};

export default PersonalColorFilter;
