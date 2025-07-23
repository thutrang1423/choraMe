export const routes = {
  danhSachDuAn: 'DanhSachDuAn',
  chiTietDuAn: 'DanhSachDuAn/ChiTietDuAn',
  quaTrinhDuAn: 'DanhSachDuAn/QuaTrinh',
  buoc: 'DanhMucBuoc',
  nguonVon: 'DanhMucNguonVon',
  hinhThucChonGoiThau: 'DanhMucHinhThucChonGoiThau',
  phuongThucChonGoiThau: 'DanhMucPhuongThucChonGoiThau',
  'Loại hợp đồng': 'LoaiHopDong',
  'Gói thầu': 'DanhMucLoaiGoiThau',
  'Khó khăn': 'DanhMucTinhTrangKhoKhan',
  'Màn hình': 'DanhMucManHinh'
};

export const rootPath = '/quan-ly-du-an';

export const duAnPath = `/du-an`;

export const chiTietDuAnPath = `${duAnPath}/$duAnId`;
export const chinhSuaDuAnPath = `${chiTietDuAnPath}/chinh-sua`;
export const themMoiDuAnPath = `${duAnPath}/them-moi`;

export const tienDoDuAnPath = `${duAnPath}/$duAnId/tien-do`;

export const danhMucPath = `/danh-muc`;
export const tinhTrangDuAnPath = `${danhMucPath}/tinh-trang-du-an`;
