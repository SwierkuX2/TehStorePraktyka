export type Product = {
  id: number;
  name: string;
  price: number;
  img: string;
  category: string; 
};

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch("http://localhost:8081/products", {
    credentials: "include",
  });
  return res.json();
};