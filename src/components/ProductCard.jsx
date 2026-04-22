// Импортируем файл стилей для карточки товара
import "./ProductCard.css";


// Компонент карточки товара
// Он принимает props (свойства), переданные из родительского компонента App
// product — объект товара
// onDelete — функция удаления товара
// onEdit — функция редактирования товара
function ProductCard({ product, onDelete, onEdit }) {

  return (

    // Основной контейнер карточки товара
    <article className="card">

      {/* Изображение товара */}
      {/* thumbnail — ссылка на картинку */}
      {/* alt — альтернативный текст если изображение не загрузится */}
      <img
        className="thumb"
        src={product.thumbnail}
        alt={product.title}
      />


      {/* Основная часть карточки */}
      <div className="body">

        {/* Название товара */}
        <h2 className="title">
          {product.title}
        </h2>


        {/* Описание товара */}
        <p className="desc">
          {product.description}
        </p>


        {/* Блок с дополнительной информацией */}
        <div className="meta">

          {/* Цена товара */}
          <span className="price">
            ${product.price}
          </span>

          {/* Рейтинг товара */}
          <span className="rating">
            ⭐ {product.rating}
          </span>

        </div>


        {/* Теги товара */}
        <div className="tags">

          {/* Бренд товара */}
          <span className="tag">
            {product.brand}
          </span>

          {/* Категория товара */}
          <span className="tag">
            {product.category}
          </span>

        </div>


        {/* Блок кнопок действий */}
        <div className="actions">

          {/* Кнопка редактирования */}
          {/* При нажатии вызывается функция onEdit */}
          {/* В неё передается весь объект товара */}
          <button
            onClick={() => onEdit(product)}
          >
            Редактировать
          </button>


          {/* Кнопка удаления */}
          {/* Передаем id товара в функцию удаления */}
          <button
            onClick={() => onDelete(product.id)}
          >
            Удалить
          </button>

        </div>

      </div>
    </article>
  );
}


// Экспорт компонента чтобы его можно было использовать в App.jsx
export default ProductCard;