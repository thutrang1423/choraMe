export const SeasonMap = {
  // SPRING FAMILY
  light_spring: 'Xuân Nhạt – Light Spring',
  true_spring: 'Xuân Đúng – True Spring',
  warm_spring: 'Xuân Ấm – Warm Spring',

  // SUMMER FAMILY
  light_summer: 'Hạ Nhạt – Light Summer',
  true_summer: 'Hạ Đúng – True Summer',
  soft_summer: 'Hạ Dịu – Soft Summer',

  // AUTUMN FAMILY
  soft_autumn: 'Thu Dịu – Soft Autumn',
  true_autumn: 'Thu Đúng – True Autumn',
  dark_autumn: 'Thu Đậm – Dark Autumn',

  // WINTER FAMILY
  deep_winter: 'Đông Sâu – Deep Winter',
  true_winter: 'Đông Đúng – True Winter',
  cool_winter: 'Đông Lạnh – Cool Winter',
} as const;

// Sắc độ da (Subtone) theo mùa
export const SubtoneMap = {
  // SPRING
  da_hong_nhe: 'Da hồng nhẹ',
  da_vang_sang: 'Da vàng sáng',
  da_be_sang: 'Da be sáng',
  da_olive_nhe: 'Da olive nhẹ',
  da_trung_tinh_mit: 'Da trung tính dịu',
  vang_ong: 'Vàng óng',
  vang_kem: 'Vàng kem',
  vang_dao: 'Vàng đào',
  vang_ngam: 'Vàng ngăm',
  vang_be: 'Vàng be',
  vang_sang: 'Vàng sáng',
  vang_trung_tinh: 'Vàng trung tính',

  // SUMMER
  hong_lanh: 'Hồng lạnh',
  be_lanh: 'Be lạnh',
  trang_xam: 'Trắng xám',
  hong_nhe_trung_tinh: 'Hồng nhẹ trung tính',
  trang_xanh_lanh: 'Trắng xanh lạnh',
  hong_lanh_sang: 'Hồng lạnh sáng',
  hong_be_tram: 'Hồng be trầm',
  trung_tinh_nghi_lanh: 'Trung tính nghi lạnh',
  be_xam_lanh: 'Be xám lạnh',
  hong_xam_nhe: 'Hồng xám nhẹ',
  trung_tinh_xam: 'Trung tính xám',

  // AUTUMN
  be_vang_nhe: 'Be vàng nhẹ',
  be_hong_nguoi: 'Be hồng ngùi',
  vang_xam: 'Vàng xám',
  trung_tinh_am: 'Trung tính ấm',
  ngam_vang_mem: 'Ngăm vàng mềm',
  vang_ong_am: 'Vàng óng ấm',
  be_vang_sang: 'Be vàng sáng',
  nau_sang_am: 'Nâu sáng ấm',
  vang_nau_ngam: 'Vàng nâu ngăm',
  be_ngam_ach: 'Be ngăm ánh',
  trung_tinh_sam_am: 'Trung tính sẫm ấm',

  // WINTER
  trang_hong_lanh: 'Trắng hồng lạnh',
  trang_xam_sang: 'Trắng xám sáng',
  ngam_lanh: 'Ngăm lạnh',
  trung_tinh_lanh: 'Trung tính lạnh',
  trang_xam_lanh: 'Trắng xám lạnh',
} as const;

// Đặc điểm nổi bật (Dominant Features)
export const DominantFeatureMap = {
  // Common
  low_contrast: 'Tương phản thấp',
  medium_contrast: 'Tương phản vừa',
  do_tuong_phan_vua: 'Độ tương phản vừa',
  do_tuong_phan_trung: 'Tương phản trung bình',
  do_tuong_phan_cao: 'Tương phản cao',
  tone_dong_deu: 'Tổng thể đồng đều',
  tong_toi_dong_deu: 'Tông tối đồng đều',
  tong_sang_ro_net: 'Tông sáng rõ nét',
  tong_lanh_ro_net: 'Tông lạnh rõ nét',

  // Mắt, tóc, da
  mat_sang_noi_bat: 'Mắt sáng nổi bật',
  mat_xanh_la: 'Mắt xanh lá',
  mat_sang_xam: 'Mắt xám bạc',
  mat_xam_nhat: 'Mắt xám nhạt',
  mat_xam_tro: 'Mắt xám tro',
  mat_nau_reu: 'Mắt nâu rêu',
  mat_nau_sau: 'Mắt nâu sâu',
  mat_sau_ruc: 'Mắt sâu rực rỡ',
  mat_sang_lanh: 'Mắt sáng lạnh',
  mat_xanh_lanh: 'Mắt xanh lạnh',

  toc_sang_noi_bat: 'Tóc sáng nổi bật',
  toc_vang_cam: 'Tóc vàng cam',
  toc_nau_cam: 'Tóc nâu cam',
  toc_nau_reu: 'Tóc nâu rêu',
  toc_nau_sam: 'Tóc nâu sẫm',
  toc_xam_tro: 'Tóc xám tro',
  toc_nau_tro: 'Tóc nâu tro',
  toc_den_dam: 'Tóc đen đậm',
  toc_den_xanh: 'Tóc đen ánh xanh',
  toc_den_lanh: 'Tóc đen lạnh',

  da_ruc_sang: 'Da rực sáng',
  da_noi_bat: 'Da nổi bật',
} as const;
