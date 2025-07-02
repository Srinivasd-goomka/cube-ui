import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { CubeDrawer } from "../../../components/ui/drawer/CubeDrawer";
import { useLocation, useNavigate } from "react-router-dom";
import { productConfig } from "../../../constants/metadata/products/metadata-config";
import { CubeProductForm } from "../../../components/ui/product-form/CubeProductForm";
import { FieldConfig } from "../../../types";
import useSiteStore from "../../../store/site";
import { useParams } from "react-router-dom";

const SiteDetailsPage: React.FC = () => {
  const { siteId } = useParams();
  const { fetchSite } = useSiteStore();
  const [opened, setOpened] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [selectedMetadata, setSelectedMetadata] = useState<{
    metaDataFields: FieldConfig[];
    defaultCategoryOverrides: Record<string, string[]>;
    defaultBaseValues: Record<string, unknown>;
  } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleShowProductForm = (productId: string, productName: string) => {
    const params = new URLSearchParams(location.search);
    params.set("productId", productId);
    navigate(`${location.pathname}?${params.toString()}`);
    setSelectedProduct({ id: productId, name: productName });
    // @ts-expect-error needs type check
    const { metaDataFields, defaultCategoryOverrides, defaultBaseValues } =
      productConfig(Number(productId));

    setSelectedMetadata({
      metaDataFields: metaDataFields,
      defaultCategoryOverrides: defaultCategoryOverrides,
      defaultBaseValues: defaultBaseValues,
    });
    setOpened(true);
  };

  useEffect(() => {
    fetchSite(Number(siteId));
  }, [fetchSite, siteId]);
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">Sites Page</h1>
        <ProductList onProductClick={handleShowProductForm} />
      </div>

      {/* /Modal */}
      <CubeDrawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={selectedProduct?.name || ""}
        withCloseButton
      >
        <CubeProductForm
          fields={selectedMetadata?.metaDataFields ?? []}
          defaultCategoryOverrides={selectedMetadata?.defaultCategoryOverrides}
          defaultBaseValues={selectedMetadata?.defaultBaseValues}
          onClose={() => setOpened(false)}
        />
      </CubeDrawer>
    </>
  );
};

export default SiteDetailsPage;
