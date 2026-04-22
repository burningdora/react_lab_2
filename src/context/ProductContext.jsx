import { createContext, useContext, useReducer, useState } from "react";

const ProductContext = createContext();

function productsReducer(state, action) {
  switch (action.type) 
  //ждет команду на редактирование и тп
  {
    case "SET": return action.payload;
    case "ADD": return [action.payload, ...state];
    case "UPDATE": return state.map(p => p.id === action.payload.id ? action.payload : p);
    case "DELETE": return state.filter(p => p.id !== action.payload);
    default: return state;
  }
}

export const ProductProvider = ({ children }) => {
  const [products, dispatch] = useReducer(productsReducer, []);
  const [loading, setLoading] = useState(false);

  const fetchEntities = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://dummyjson.com/products?limit=30");
      const data = await res.json();
      dispatch({ type: "SET", payload: data.products });
    } finally { setLoading(false); }
  };

  return (
    <ProductContext.Provider value={{ 
      products, loading, fetchEntities, 
      addEntity: (p) => dispatch({ type: "ADD", payload: { ...p, id: Date.now() } }),
      updateEntity: (p) => dispatch({ type: "UPDATE", payload: p }),
      deleteEntity: (id) => dispatch({ type: "DELETE", payload: id }) 
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);