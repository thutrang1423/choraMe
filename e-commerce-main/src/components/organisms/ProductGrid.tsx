import React from "react";
import { Pagination } from "@mui/material";
import ProductCard from "../molecules/ProductCard";
import { ProductCard as ProductType } from "../../types/product.type";

interface ProductGridProps {
  products: ProductType[];
  page: number;
  onPageChange: (_: React.ChangeEvent<unknown>, value: number) => void;
  productsPerPage?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  page,
  onPageChange,
  productsPerPage = 12, // Đặt mặc định là 12 nếu bạn muốn
}) => {
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (page - 1) * productsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="col-span-3 bg-gray-100 rounded-lg p-4">
      <div className="grid grid-cols-3 gap-4 mb-4">
        {paginatedProducts.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={onPageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default ProductGrid;
