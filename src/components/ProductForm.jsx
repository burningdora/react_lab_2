import { useEffect, useState } from "react";
import "./ProductForm.css";

const emptyForm = {
  title: "",
  description: "",
  price: "",
  rating: "",
  brand: "",
  category: "",
  thumbnail: "",
};

function ProductForm({
  onAddProduct,
  onUpdateProduct,
  editingProduct,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        title: editingProduct.title || "",
        description: editingProduct.description || "",
        price: editingProduct.price || "",
        rating: editingProduct.rating || "",
        brand: editingProduct.brand || "",
        category: editingProduct.category || "",
        thumbnail: editingProduct.thumbnail || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingProduct]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const productData = {
      ...formData,
      price: Number(formData.price),
      rating: Number(formData.rating),
    };

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        ...productData,
      });
    } else {
      onAddProduct(productData);
    }

    setFormData(emptyForm);
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{editingProduct ? "Редактирование товара" : "Добавление товара"}</h2>

      <input
        type="text"
        name="title"
        placeholder="Название"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="description"
        placeholder="Описание"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Цена"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        step="0.1"
        name="rating"
        placeholder="Рейтинг"
        value={formData.rating}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="brand"
        placeholder="Бренд"
        value={formData.brand}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Категория"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="thumbnail"
        placeholder="Ссылка на изображение"
        value={formData.thumbnail}
        onChange={handleChange}
        required
      />

      <div className="form-actions">
        <button type="submit">
          {editingProduct ? "Сохранить изменения" : "Добавить"}
        </button>

        {editingProduct && (
          <button type="button" onClick={onCancelEdit}>
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;