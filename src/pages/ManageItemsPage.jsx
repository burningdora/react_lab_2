import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";
import "../App.css";

const ManageItemsPage = () => {
  // Достаем данные и функции из контекста
  const { products, addEntity, updateEntity, deleteEntity, loading } = useProducts();
  
  // СОСТОЯНИЕ: здесь мы храним товар, который выбрали для правки
  const [editingProduct, setEditingProduct] = useState(null);

  // Функция, которая срабатывает при клике на "Редактировать" в карточке
  const handleEditClick = (product) => {
    setEditingProduct(product); // Кладем товар в состояние
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Плавный скролл к форме
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: "#ff4d94" }}>Управление товарами</h1>
      
      {/* ПЕРЕДАЕМ ДАННЫЕ В ФОРМУ */}
      <div style={{ marginBottom: '30px', background: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
        <ProductForm 
          onAddProduct={addEntity} 
          onUpdateProduct={(p) => { 
            updateEntity(p); 
            setEditingProduct(null); // Очищаем форму после сохранения
          }}
          editingProduct={editingProduct} // Передаем выбранный товар
          onCancelEdit={() => setEditingProduct(null)} // Функция отмены
        />
      </div>

      <hr />

      {/* ОТОБРАЖАЕМ КАРТОЧКИ */}
      <div className="grid">
        {products.map(p => (
          <ProductCard 
            key={p.id} 
            product={p} 
            onDelete={deleteEntity} 
            onEdit={handleEditClick} // ПРИВЯЗЫВАЕМ ФУНКЦИЮ К КНОПКЕ
          />
        ))}
      </div>
    </div>
  );
};

export default ManageItemsPage;