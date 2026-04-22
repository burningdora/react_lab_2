// Импортируем React-хуки
// useState — хранит данные формы
// useEffect — реагирует на изменение редактируемого товара
import { useEffect, useState } from "react";

// Импорт стилей формы
import "./ProductForm.css";


// Пустой объект формы
// Используется как начальное состояние и для очистки формы
const emptyForm = {
  title: "",
  description: "",
  price: "",
  rating: "",
  brand: "",
  category: "",
  thumbnail: "",
};


// Компонент формы добавления / редактирования товара
// Получает функции и данные из родительского компонента App
function ProductForm({
  onAddProduct,     // функция добавления товара
  onUpdateProduct,  // функция обновления товара
  editingProduct,   // товар который сейчас редактируется
  onCancelEdit,     // функция отмены редактирования
}) {

  // useState хранит текущее состояние формы
  const [formData, setFormData] = useState(emptyForm);


  // useEffect срабатывает когда меняется editingProduct
  // Если выбран товар для редактирования — заполняем форму его данными
  // Если редактирование отменено — очищаем форму
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

      // если редактирование не активно — очищаем форму
      setFormData(emptyForm);
    }

  }, [editingProduct]);



  // Функция изменения данных в input
  function handleChange(e) {

    // получаем имя поля и его значение
    const { name, value } = e.target;

    // обновляем соответствующее поле формы
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }



  // Функция отправки формы
  function handleSubmit(e) {

    // предотвращаем перезагрузку страницы
    e.preventDefault();


    // создаем объект товара
    const productData = {
      ...formData,

      // преобразуем строку в число
      price: Number(formData.price),
      rating: Number(formData.rating),
    };


    // если мы редактируем товар
    if (editingProduct) {

      // вызываем функцию обновления
      onUpdateProduct({
        ...editingProduct,
        ...productData,
      });

    } else {

      // иначе создаем новый товар
      onAddProduct(productData);
    }


    // после отправки очищаем форму
    setFormData(emptyForm);
  }



  // JSX — разметка формы
  return (

    // Форма отправляется через handleSubmit
    <form className="product-form" onSubmit={handleSubmit}>

      {/* Заголовок формы */}
      <h2>
        {editingProduct
          ? "Редактирование товара"
          : "Добавление товара"}
      </h2>



      {/* Поле названия товара */}
      <input
        type="text"
        name="title"
        placeholder="Название"
        value={formData.title}
        onChange={handleChange}
        required
      />


      {/* Поле описания */}
      <input
        type="text"
        name="description"
        placeholder="Описание"
        value={formData.description}
        onChange={handleChange}
        required
      />


      {/* Поле цены */}
      <input
        type="number"
        name="price"
        placeholder="Цена"
        value={formData.price}
        onChange={handleChange}
        required
      />


      {/* Поле рейтинга */}
      <input
        type="number"
        step="0.1"
        name="rating"
        placeholder="Рейтинг"
        value={formData.rating}
        onChange={handleChange}
        required
      />


      {/* Поле бренда */}
      <input
        type="text"
        name="brand"
        placeholder="Бренд"
        value={formData.brand}
        onChange={handleChange}
        required
      />


      {/* Поле категории */}
      <input
        type="text"
        name="category"
        placeholder="Категория"
        value={formData.category}
        onChange={handleChange}
        required
      />


      {/* Поле ссылки на изображение */}
      <input
        type="text"
        name="thumbnail"
        placeholder="Ссылка на изображение"
        value={formData.thumbnail}
        onChange={handleChange}
        required
      />



      {/* Блок кнопок формы */}
      <div className="form-actions">

        {/* Кнопка отправки формы */}
        <button type="submit">

          {editingProduct
            ? "Сохранить изменения"
            : "Добавить"}

        </button>


        {/* Кнопка отмены редактирования */}
        {editingProduct && (

          <button
            type="button"
            onClick={onCancelEdit}
          >
            Отмена
          </button>

        )}

      </div>

    </form>
  );
}


// Экспорт компонента
export default ProductForm;