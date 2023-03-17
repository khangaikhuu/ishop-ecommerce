import { createContext, useState } from "react";

const ProductContext = createContext(null);

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const URL = "http://localhost:8081/products";

  return (
    <ProductContext.Provider value={{ products, setProducts, URL }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductContextProvider };
