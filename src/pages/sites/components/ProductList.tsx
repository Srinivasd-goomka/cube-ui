import React from "react";
import { dummyProductList } from "../../../constants/dummyProducts";
import { productList } from "../../../constants";
import CubeCard from "../../../components/ui/card/CubeCard";
import { Plus } from "lucide-react";
import { customSortOrder } from "../../../lib/helpers";
// import { useQuery } from "@tanstack/react-query";
// import { productService } from "../../../services/product";
// import { useParams } from "react-router-dom";

type ProductListProps = {
  onProductClick: (productId: string, productName: string) => void;
};

const ProductList: React.FC<ProductListProps> = ({ onProductClick }) => {
  //TODO Fetch from API
  //   const { siteId } = useParams();
  //   const { data: productList } = useQuery({
  //     queryKey: ["productPricing", siteId],
  //     queryFn: () => {
  //       if (!siteId) return Promise.resolve([]);
  //       return productService.getProductsBySiteId(Number(siteId));
  //     },
  //     refetchOnWindowFocus: false,
  //   });

  //TODO Remove dummy data
  const removedOther = dummyProductList().filter((product: unknown) =>
    product.product_name === "Other"
      ? (product.product_name = "Grease Trap")
      : product.product_name
  );
  const sortedData = customSortOrder(
    removedOther,
    productList(),
    "product_name"
  );
  const dummyproductList = sortedData;
  //Remove dummy data

  return (
    <CubeCard title="Add Product">
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-2">
        {dummyproductList?.map((item) => (
          <div key={item.id}>
            <div
              className={`
          border rounded flex items-center justify-between p-2
          transition-colors duration-200 min-h-[60px] cursor-pointer hover:bg-gray-100
        `}
              onClick={() => onProductClick(String(item.id), item.product_name)}
            >
              <div className="flex flex-col items-start w-[calc(100%-50px)] overflow-hidden">
                <span
                  className="truncate w-full text-[13px] font-bold text-[#3D4A5C]"
                  title={item.product_name}
                >
                  {item.product_name}
                </span>
                <button className="text-blue-500 text-[14px] p-0 m-0 text-left flex items-center">
                  <Plus className="h-4 w-4" />
                  Add
                </button>
              </div>

              <div className="w-10 h-10 flex-shrink-0">
                <img
                  src={`/product-icons/${item.product_name
                    .split(" ")
                    .join("-")
                    .toLowerCase()}.svg`}
                  alt={item.product_name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </CubeCard>
  );
};

export default ProductList;
