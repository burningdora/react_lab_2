import { useState, lazy, Suspense, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Layout from "./layout/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

// Ленивая загрузка страниц для оптимизации (Часть 9 лабы)
const ItemsPage = lazy(() => import("./pages/ItemsPage"));
const ManageItemsPage = lazy(() => import("./pages/ManageItemsPage"));

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Редирект на логин при обновлении страницы (F5), если пользователь не на публичном пути
  useEffect(() => {
    const publicPaths = ["/", "/login"];
    if (!isAuth && !publicPaths.includes(location.pathname)) {
      navigate("/login");
    }
  }, [isAuth, location.pathname, navigate]);

  return (
    <Suspense fallback={<div style={{ padding: 20 }}>Загрузка приложения...</div>}>
      <Routes>
        {/* Оболочка с навигацией */}
        <Route path="/" element={<Layout isAuth={isAuth} setIsAuth={setIsAuth} />}>
          
          {/* Публичные маршруты */}
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage setIsAuth={setIsAuth} />} />
          <Route path="items" element={<ItemsPage />} />
          
          {/* Защищенный маршрут для управления товарами (Часть 7 лабы) */}
          <Route path="manage" element={
            <ProtectedRoute isAuth={isAuth}>
              <ManageItemsPage />
            </ProtectedRoute>
          } />

          {/* Обработка несуществующих страниц (Часть 10 лабы) */}
          <Route path="*" element={
            <div style={{ padding: '50px', textAlign: 'center' }}>
              <h1 style={{ color: '#ff4d94', fontSize: '3rem' }}>404</h1>
              <p>Упс! Страница не найдена.</p>
            </div>
          } />
          
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;














/*
// Импортируем React-хуки
// useEffect — используется для побочных эффектов (например загрузки данных с сервера)
// useReducer — используется для управления сложным состоянием (массив товаров)
// useState — используется для простых состояний
import { useEffect, useReducer, useState } from "react";

// Импорт карточки товара
import ProductCard from "./components/ProductCard";

// Импорт формы добавления / редактирования товара
import ProductForm from "./components/ProductForm";

// Импорт стилей страницы
import "./App.css";


// Начальное состояние reducer
// Здесь хранится список товаров
const initialState = {
  products: [],
};


// Reducer — функция которая управляет состоянием
// Она принимает текущее состояние и действие (action)
// и возвращает новое состояние
function productsReducer(state, action) {

  switch (action.type) {

    // Установка списка товаров (например после загрузки с сервера)
    case "SET_PRODUCTS":
      return {
        ...state, // копируем старое состояние
        products: action.payload, // записываем новый список товаров
      };

    // Добавление нового товара
    case "ADD_PRODUCT":
      return {
        ...state,
        // новый товар добавляется в начало массива
        products: [action.payload, ...state.products],
      };

    // Удаление товара
    case "DELETE_PRODUCT":
      return {
        ...state,
        // filter удаляет товар по id
        products: state.products.filter((p) => p.id !== action.payload),
      };

    // Редактирование товара
    case "UPDATE_PRODUCT":
      return {
        ...state,
        // map проходит по всем товарам
        // если id совпадает — заменяем товар
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };

    // Если действие неизвестно — возвращаем текущее состояние
    default:
      return state;
  }
}


// Основной компонент приложения
function App() {

  // useReducer управляет списком товаров инициализация хука
  const [state, dispatch] = useReducer(productsReducer, initialState);

  // Состояние загрузки данных
  const [loading, setLoading] = useState(true);

  // Состояние ошибки
  const [error, setError] = useState("");

  // Товар который сейчас редактируется
  const [editingProduct, setEditingProduct] = useState(null);

  // Текущая страница пагинации
  const [currentPage, setCurrentPage] = useState(1);

  // Количество товаров на странице
  const [itemsPerPage, setItemsPerPage] = useState(6);



  // useEffect выполняется один раз при загрузке страницы
  // Здесь происходит загрузка данных с сервера
  useEffect(() => {

    async function loadProducts() {
      try {

        // включаем состояние загрузки
        setLoading(true);

        // очищаем прошлую ошибку
        setError("");

        // отправляем HTTP запрос к серверу
        const res = await fetch("https://dummyjson.com/products?limit=30");

        // если сервер вернул ошибку
        if (!res.ok) {
          throw new Error("Ошибка загрузки: " + res.status);
        }

        // преобразуем ответ сервера из JSON
        const data = await res.json();

        // отправляем данные в reducer
        dispatch({
          type: "SET_PRODUCTS",
          payload: data.products,
        });

      } catch (e) {

        // если произошла ошибка
        setError(e.message || "Неизвестная ошибка");

      } finally {

        // выключаем состояние загрузки
        setLoading(false);
      }
    }

    // вызываем функцию загрузки
    loadProducts();

  }, []); // пустой массив значит useEffect выполнится один раз



  // Добавление нового товара
  function handleAddProduct(newProduct) {

    dispatch({
      type: "ADD_PRODUCT",

      // создаем уникальный id для нового товара
      payload: {
        ...newProduct,
        id: Date.now(),
      },
    });

    // после добавления возвращаемся на первую страницу
    setCurrentPage(1);
  }



  // Удаление товара
  function handleDeleteProduct(id) {

    dispatch({
      type: "DELETE_PRODUCT",
      payload: id,
    });
  }



  // Нажатие кнопки "Редактировать"
  function handleEditClick(product) {

    // записываем товар который нужно редактировать
    setEditingProduct(product);
  }



  // Сохранение изменений товара
  function handleUpdateProduct(updatedProduct) {

    dispatch({
      type: "UPDATE_PRODUCT",
      payload: updatedProduct,
    });

    // очищаем режим редактирования
    setEditingProduct(null);
  }



  // Отмена редактирования
  function handleCancelEdit() {
    setEditingProduct(null);
  }



  // Общее количество товаров
  const totalItems = state.products.length;

  // Количество страниц
  const totalPages = Math.ceil(totalItems / itemsPerPage);



  // Индекс первого элемента на странице
  const startIndex = (currentPage - 1) * itemsPerPage;

  // Индекс последнего элемента
  const endIndex = startIndex + itemsPerPage;



  // Получаем только товары текущей страницы
  const currentProducts = state.products.slice(startIndex, endIndex);



  // Переход на предыдущую страницу
  function goToPreviousPage() {

    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }



  // Переход на следующую страницу
  function goToNextPage() {

    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }



  // Изменение количества товаров на странице
  function handleItemsPerPageChange(e) {

    setItemsPerPage(Number(e.target.value));

    // возвращаемся на первую страницу
    setCurrentPage(1);
  }



  // JSX — разметка компонента
  return (
    <div className="page">

      }
      <header className="header">
        <h1>React Lab 2 — Products Manager</h1>
        <p>CRUD через useReducer + загрузка с сервера + пагинация</p>
      </header>



      {/* Форма добавления и редактирования товара }
      <ProductForm
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        editingProduct={editingProduct}
        onCancelEdit={handleCancelEdit}
      />



      {/* Панель управления }
      <div className="toolbar">

        {/* Select для выбора количества элементов }
        <label>
          Показывать по:

          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={3}>3</option>
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
          </select>

        </label>
      </div>



      {/* Состояние загрузки }
      {loading && <div className="state">Загрузка...</div>}



      {/* Состояние ошибки }
      {error && <div className="state error">Ошибка: {error}</div>}



      {/* Если данные загрузились }
      {!loading && !error && (
        <>

          {/* Сетка карточек товаров }
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



          {/* Блок пагинации }
          <div className="pagination">

            {/* Кнопка предыдущей страницы }
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Назад
            </button>



            {/* Текущая страница }
            <span>
              Страница {currentPage} из {totalPages || 1}
            </span>



            {/* Кнопка следующей страницы }
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


// Экспорт компонента
export default App;*/
