import { createContext, useState } from "react";

const CategoryContext = createContext(null);

const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const URL = "http://localhost:8081/admin/categories";
  console.log(categories);

  return (
    <CategoryContext.Provider value={[categories, setCategories, URL]}>
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryContext, CategoryContextProvider };
