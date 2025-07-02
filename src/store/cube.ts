import { create } from "zustand";

interface ProductsState {
  products: unknown[];
  loading: boolean;
  error: string | null;
  addProduct: (user: Omit<unknown, "id">) => void;
  //   deleteUser: (id: number) => void;
}

const useCubeStore = create<ProductsState>((set) => ({
  products: [],
  loading: false,
  error: null,

  addProduct: (product: unknown) => {
    const currProductId = localStorage.getItem("add-product");
    if (!currProductId) return;
    set((state) => {
      const productIndex = state.products.findIndex(
        (p) => (p as { display_id?: string }).display_id === currProductId
      );

      if (productIndex !== -1) {
        // Update existing product immutably
        const updatedProducts = [...state.products];
        const existingProduct = updatedProducts[productIndex];
        updatedProducts[productIndex] =
          existingProduct &&
          typeof existingProduct === "object" &&
          existingProduct !== null &&
          product &&
          typeof product === "object" &&
          product !== null
            ? { ...existingProduct, ...product }
            : product;
        console.log("Store -->", updatedProducts)
        return { products: updatedProducts };
      } else {
        return { products: [...state.products, product] };
      }
    });
  },
}));

export default useCubeStore;
