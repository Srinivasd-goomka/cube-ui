import CubeCard from "../../../components/ui/card/CubeCard";
import { Plus } from "lucide-react";
import { CubeSkeleton } from "../../../components/utils/skeleton/CubeSkeleton";
import { useQuery } from "@tanstack/react-query";
import { productService } from "../../../services/product";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { RootProductList } from "../../../types";

type ProductListProps = {
  onProductClick: (productId: string, productName: string) => void;
};

const ProductList: React.FC<ProductListProps> = ({ onProductClick }) => {
  const { siteId } = useParams();

  const fetchProducts = async (): Promise<RootProductList[]> => {
    if (!siteId) return [];
    const products = await productService.getProductsBySiteId(Number(siteId));

    return products.map(
      (item: Partial<RootProductList> & { product_id?: string | number }) => {
        let id: number = 0;
        if (
          "id" in item &&
          (typeof item.id === "string" || typeof item.id === "number")
        ) {
          id = Number(item.id);
        } else if (
          "product_id" in item &&
          (typeof item.product_id === "string" ||
            typeof item.product_id === "number")
        ) {
          id = Number(item.product_id);
        }
        return {
          id,
          product_name:
            typeof item.product_name === "string" ? item.product_name : "",
          product_abbreviation:
            typeof item.product_abbreviation === "string"
              ? item.product_abbreviation
              : "",
          product_line:
            typeof item.product_line === "string" ? item.product_line : "",
          status: typeof item.status === "number" ? item.status : 0,
          product_description:
            typeof item.product_description === "string"
              ? item.product_description
              : "",
          call_script: Array.isArray(item.call_script) ? item.call_script : [],
          script_tips:
            typeof item.script_tips === "string" ? item.script_tips : "",
          wizard_field: Array.isArray(item.wizard_field)
            ? item.wizard_field
            : [],
          product_image:
            typeof item.product_image === "string" ? item.product_image : "",
          product_type: Array.isArray(item.product_type)
            ? item.product_type
            : [],
        } as RootProductList;
      }
    );
  };

  const {
    data: productList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["productPricing", siteId],
    queryFn: fetchProducts,
    enabled: !!siteId,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  if (isError) {
    toast.error("Something went wrong");
  }

  return (
    <CubeCard title="Add Product">
      <div>
        {isLoading && (
          <div className="flex items-center flex-wrap gap-6">
            {Array.from({ length: 9 }, (_, i) => (
              <CubeSkeleton key={i} height={60} width={300} />
            ))}
          </div>
        )}
      </div>
      {!isLoading && (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
          {productList?.map((item) => (
            <div key={item.id}>
              <div
                className={`
          border rounded flex items-center justify-between p-2
          transition-colors duration-200 min-h-[60px] cursor-pointer hover:bg-gray-100 hover:shadow-sm
        `}
                onClick={() =>
                  onProductClick(String(item.id), item.product_name)
                }
              >
                <div className="flex flex-col items-start w-[calc(100%-50px)] overflow-hidden">
                  <span
                    className="truncate w-full text-[13px] font-bold text-slategray"
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
      )}
    </CubeCard>
  );
};

export default ProductList;
