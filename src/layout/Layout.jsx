import { Outlet, NavLink } from "react-router-dom";
import "./Layout.css"; // Файл стилей создадим чуть позже

const Layout = ({ isAuth, setIsAuth }) => {
  return (
    <div>
      <header style={{ padding: '20px', borderBottom: '1px solid #ccc', display: 'flex', gap: '20px' }}>
        <NavLink to="/" style={({ isActive }) => ({ color: isActive ? '#ff4d94' : 'black', textDecoration: 'none' })}>Главная</NavLink>
        <NavLink to="/items" style={({ isActive }) => ({ color: isActive ? '#ff4d94' : 'black', textDecoration: 'none' })}>Товары</NavLink>
        
        {isAuth ? (
          <>
            <NavLink to="/manage" style={({ isActive }) => ({ color: isActive ? '#ff4d94' : 'black', textDecoration: 'none' })}>Управление</NavLink>
            <button onClick={() => setIsAuth(false)}>Выйти</button>
          </>
        ) : (
          <NavLink to="/login" style={({ isActive }) => ({ color: isActive ? '#ff4d94' : 'black', textDecoration: 'none' })}>Войти</NavLink>
        )}
      </header>

      <main>
        <Outlet /> {/* Здесь будет меняться содержимое страниц */}
      </main>
    </div>
  );
};

export default Layout;