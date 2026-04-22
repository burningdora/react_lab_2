export default function Filters({ filters, setFilters, onReset, count }) {
  return (
    <div className="filters-section" style={{ background: '#fff', padding: '20px', borderRadius: '15px', marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
      <input 
        type="text" 
        placeholder="Поиск товара..." 
        value={filters.search}
        onChange={(e) => setFilters({...filters, search: e.target.value})}
        style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ccc', width: '250px' }}
      />
      <select 
        value={filters.category} 
        onChange={(e) => setFilters({...filters, category: e.target.value})}
        style={{ padding: '8px', borderRadius: '8px' }}
      >
        <option value="">Все категории</option>
        <option value="beauty">Косметика</option>
        <option value="fragrances">Парфюмерия</option>
        <option value="furniture">Мебель</option>
      </select>
      <button onClick={onReset} style={{ background: '#000', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer' }}>
        Сбросить
      </button>
      <span style={{ fontWeight: 'bold' }}>Найдено: {count}</span>
    </div>
  );
}