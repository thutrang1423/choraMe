import { Product as ProductType } from "../../types/product.type";

type Props = {
  product: ProductType;
};

const ProductDetailSection = ({ product }: Props) => {
  const { detail, variants } = product;

  if (!detail) return null;

  return (
    <div className="p-10 text-lg text-gray-700 space-y-3">
      {/* Thông tin mô tả chi tiết */}
      {detail.des && <p><strong>Mô tả:</strong> {detail.des}</p>}
      {detail.material && <p><strong>Chất liệu:</strong> {detail.material}</p>}
      {detail.brand && <p><strong>Thương hiệu:</strong> {detail.brand}</p>}
      {detail.origin && <p><strong>Xuất xứ:</strong> {detail.origin}</p>}
      {detail.gender && <p><strong>Giới tính:</strong> {detail.gender}</p>}
      {detail.season && <p><strong>Mùa:</strong> {detail.season}</p>}
      <p>
        {/* <strong>Mới:</strong> {detail.is_new ? "✅" : "❌"} –{" "} */}
        <strong>Nổi bật:</strong> {detail.is_featured ? "✅" : "❌"}
      </p>

      {/* Biến thể sản phẩm */}
      <div className="pt-2">
        <strong>Biến thể:</strong>
        {variants && variants.length > 0 ? (
          <ul className="list-disc pl-5 text-gray-600 mt-1">
            {variants.map((v, idx) => (
              <li key={idx}>
                {v.size} / {v.color} — Số lượng: {v.stock}{" "}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Chưa có biến thể.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailSection;
