import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom"; 
// Импортируем твой контекст и компоненты из предыдущих лаб
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import "../App.css"; 

const ItemsPage = () => {
  // Подключаемся к данным
  const { products, loading, fetchEntities, deleteEntity } = useProducts();
  
  // Работаем с поисковой строкой URL (требование 5-й лабы)
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // Загружаем список при открытии страницы
  useEffect(() => {
    if (fetchEntities) fetchEntities();
  }, []);

  // Фильтруем список на основе того, что написано в URL
  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: "#ff4d94" }}>Список товаров</h2>
      
      {/* Поиск, который меняет URL */}
      <Filters 
        filters={{ search: searchQuery }} 
        setFilters={(newFilters) => setSearchParams({ search: newFilters.search })} 
        count={filteredProducts.length}
      />

      {loading && <p className="loader">Загрузка товаров...</p>}

      {/* Отрисовка самих карточек */}
      <div className="grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(p => (
            <ProductCard 
              key={p.id} 
              product={p} 
              onDelete={deleteEntity} 
            />
          ))
        ) : (
          !loading && <p>Товары не найдены 🔍</p>
        )}
      </div>
    </div>
  );
};

export default ItemsPage;