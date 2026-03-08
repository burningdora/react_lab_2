import { useEffect, useReducer, useState } from "react";
import ProductCard from "./components/ProductCard";
import ProductForm from "./components/ProductForm";
import "./App.css";

const initialState = {
  products: [],
};

function productsReducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    case "ADD_PRODUCT":
      return {
        ...state,
        products: [action.payload, ...state.products],
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingProduct, setEditingProduct] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("https://dummyjson.com/products?limit=30");
        if (!res.ok) {
          throw new Error("Ошибка загрузки: " + res.status);
        }

        const data = await res.json();

        dispatch({
          type: "SET_PRODUCTS",
          payload: data.products,
        });
      } catch (e) {
        setError(e.message || "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  function handleAddProduct(newProduct) {
    dispatch({
      type: "ADD_PRODUCT",
      payload: {
        ...newProduct,
        id: Date.now(),
      },
    });

    setCurrentPage(1);
  }

  function handleDeleteProduct(id) {
    dispatch({
      type: "DELETE_PRODUCT",
      payload: id,
    });
  }

  function handleEditClick(product) {
    setEditingProduct(product);
  }

  function handleUpdateProduct(updatedProduct) {
    dispatch({
      type: "UPDATE_PRODUCT",
      payload: updatedProduct,
    });

    setEditingProduct(null);
  }

  function handleCancelEdit() {
    setEditingProduct(null);
  }

  const totalItems = state.products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentProducts = state.products.slice(startIndex, endIndex);

  function goToPreviousPage() {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  function goToNextPage() {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }

  function handleItemsPerPageChange(e) {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div className="page">
      <header className="header">
        <h1>React Lab 2 — Products Manager</h1>
        <p>CRUD через useReducer + загрузка с сервера + пагинация</p>
      </header>

      <ProductForm
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        editingProduct={editingProduct}
        onCancelEdit={handleCancelEdit}
      />

      <div className="toolbar">
        <label>
          Показывать по:
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value={3}>3</option>
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
          </select>
        </label>
      </div>

      {loading && <div className="state">Загрузка...</div>}
      {error && <div className="state error">Ошибка: {error}</div>}

      {!loading && !error && (
        <>
          <div className="grid">
            {currentProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onDelete={handleDeleteProduct}
                onEdit={handleEditClick}
              />
            ))}
          </div>

          <div className="pagination">
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              Назад
            </button>

            <span>
              Страница {currentPage} из {totalPages || 1}
            </span>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Вперёд
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;