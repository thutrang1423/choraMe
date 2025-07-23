/**
 * Tạo một chuỗi UUID phiên bản 4 (ngẫu nhiên).
 *
 * UUID (Universally Unique Identifier) là một định danh 128 bit được
 * sử dụng để xác định thông tin trong hệ thống máy tính.
 *
 * Phiên bản 4 của UUID được tạo ra bằng các số ngẫu nhiên.
 *
 * @returns Chuỗi UUID v4 theo định dạng xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx,
 *          trong đó x là bất kỳ ký tự thập lục phân nào và y là một trong các ký tự 8, 9, A hoặc B.
 *
 * @example
 * ```typescript
 * // Tạo một UUID v4 mới
 * const id = uuidv4(); // ví dụ: "2c5ea4c0-4067-4aa9-afa6-1c2f4f25da47"
 * ```
 */
export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
