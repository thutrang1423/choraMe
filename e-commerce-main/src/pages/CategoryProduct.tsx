import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FilterSidebar from "../components/filter/FilterSidebar";
import ProductGrid from "../components/productCard/ProductGrid";
import Breadcrumb from "../components/common/Breadcrumb";
import { Product as ProductType } from "../types/product.type";
import { Card } from "@mui/material";
import {
  Season,
  Subtone,
  DominantFeature,
} from "../shared/personalColor/personalColor.type";
import MainLayout from "../components/layout/MainLayout";

const PRODUCTS_PER_PAGE = 9;

export const CategoryProduct = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get("category");

  const [filters, setFilters] = useState<{
    season: Season | "default";
    subtone: Subtone | "default";
    dominant: DominantFeature | "default";
    styles: string[];
    sizes: string[];
    priceRange: number[];
    category?: string;
  }>({
    season: "default",
    subtone: "default",
    dominant: "default",
    styles: [],
    sizes: [],
    priceRange: [0, 5000000],
  });

  const fetchProducts = async () => {
    const query = new URLSearchParams();
    const { season, subtone, dominant, styles, sizes, priceRange, category } =
      filters;

    if (season !== "default") query.set("season", season);
    if (subtone !== "default") query.set("subtone", subtone);
    if (dominant !== "default") query.set("dominant", dominant);

    if (styles.length > 0) query.set("styles", styles.join(","));
    if (sizes.length > 0) query.set("sizes", sizes.join(","));

    const [min, max] = priceRange;
    if (min > 0) query.set("price_gte", String(min));
    if (max < 5000000) query.set("price_lte", String(max));

    if (category) query.set("category", category);

    const url =
      query.toString().length > 0
        ? `http://localhost:3000/products?${query.toString()}`
        : `http://localhost:3000/products`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
      setPage(1);
    } catch (error) {
      console.error("Lỗi khi fetch sản phẩm:", error);
    }
  };

  // Tự động cập nhật filters.category khi URL thay đổi
  useEffect(() => {
    if (categorySlug) {
      setFilters((prev) => ({ ...prev, category: categorySlug }));
    } else {
      setFilters((prev) => {
        const newFilters = { ...prev };
        delete newFilters.category;
        return newFilters;
      });
    }
  }, [categorySlug]);

  // Gọi lại API khi filters thay đổi (bao gồm cả category)
  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return (
    <MainLayout>
      <Card className="w-full rounded-none shadow-none px-6 py-3">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Sản phẩm", href: "/products" },
          ]}
        />
        <div className="w-full px-3 py-6 box-border grid grid-cols-4 gap-4">
          <FilterSidebar
            season={filters.season}
            subtone={filters.subtone}
            dominant={filters.dominant}
            selectedStyleSlugs={filters.styles}
            selectedSizes={filters.sizes}
            priceRange={filters.priceRange}
            onChangeSeason={(value) =>
              setFilters((prev) => ({ ...prev, season: value }))
            }
            onChangeSubtone={(value) =>
              setFilters((prev) => ({ ...prev, subtone: value }))
            }
            onChangeDominant={(value) =>
              setFilters((prev) => ({ ...prev, dominant: value }))
            }
            onChangePriceRange={(range) =>
              setFilters((prev) => ({ ...prev, priceRange: range }))
            }
            onToggleSize={(size) =>
              setFilters((prev) => ({
                ...prev,
                sizes: prev.sizes.includes(size)
                  ? prev.sizes.filter((s) => s !== size)
                  : [...prev.sizes, size],
              }))
            }
            onToggleStyle={(slug) =>
              setFilters((prev) => ({
                ...prev,
                styles: prev.styles.includes(slug)
                  ? prev.styles.filter((s) => s !== slug)
                  : [...prev.styles, slug],
              }))
            }
            onApplyFilters={fetchProducts}
          />
          <ProductGrid
            products={products}
            page={page}
            productsPerPage={PRODUCTS_PER_PAGE}
            onPageChange={(_, value) => setPage(value)}
          />
        </div>
      </Card>
    </MainLayout>
  );
};
