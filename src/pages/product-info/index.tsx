import useCubeStore from "../../store/cube";

const ProductInfoPage: React.FC = () => {
  const { products } = useCubeStore();
  return (
    <div>
      <h2>Product Info Page</h2>
      {JSON.stringify(products)}
    </div>
  );
};

export default ProductInfoPage;
