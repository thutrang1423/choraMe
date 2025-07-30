import { useMemo } from "react";
import ProductDetailSection from "../ProductDetailSection";
import RatingSection from "../RatingSection";
import { Product as ProductType } from "../../../types/product.type";

interface TabSectionProps {
  activeTab: "detail" | "rating";
  setActiveTab: (tab: "detail" | "rating") => void;
  product: ProductType | null;
}

const TabSection = ({ activeTab, setActiveTab, product }: TabSectionProps) => {
  const tabs = useMemo(
    () => [
      { key: "detail", label: "Product Detail" },
      { key: "rating", label: "Rating Product" },
    ],
    []
  );

  return (
    <div className="w-full">
      <div className="flex justify-between border-b">
        {tabs.map((tab) => (
          <span
            key={tab.key}
            onClick={() => setActiveTab(tab.key as "detail" | "rating")}
            className={`flex-1 text-center cursor-pointer py-3 font-medium transition-all duration-200
              ${
                activeTab === tab.key
                  ? "border-b-4 border-black text-black"
                  : "text-gray-500 border-b-4 border-transparent hover:text-black hover:border-gray-300"
              }`}
          >
            {tab.label}
          </span>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "detail" && product && (
          <ProductDetailSection product={product} />
        )}
        {activeTab === "rating" && <RatingSection />}
      </div>
    </div>
  );
};

export default TabSection;
