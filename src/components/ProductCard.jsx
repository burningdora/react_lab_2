import "./ProductCard.css";

function ProductCard({ product, onDelete, onEdit }) {
  return (
    <article className="card">
      <img className="thumb" src={product.thumbnail} alt={product.title} />

      <div className="body">
        <h2 className="title">{product.title}</h2>
        <p className="desc">{product.description}</p>

        <div className="meta">
          <span className="price">${product.price}</span>
          <span className="rating">⭐ {product.rating}</span>
        </div>

        <div className="tags">
          <span className="tag">{product.brand}</span>
          <span className="tag">{product.category}</span>
        </div>

        <div className="actions">
          <button onClick={() => onEdit(product)}>Редактировать</button>
          <button onClick={() => onDelete(product.id)}>Удалить</button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;