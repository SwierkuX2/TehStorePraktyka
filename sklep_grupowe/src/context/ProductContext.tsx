import { createContext, useContext, useEffect, useState } from "react";
import { getProducts } from "../utilities/api";
import type { Product } from "../utilities/api";

type ProductContextType = {
  products: Product[];
};

const ProductContext = createContext<ProductContextType>({
  products: [],
});

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};