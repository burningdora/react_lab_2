import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Выясняем, откуда пришел пользователь. 
  // Если он пытался зайти в "Магазин", но его выкинуло на логин — после входа вернем его в "Магазин".
  const from = location.state?.from?.pathname || "/";

  const handleLogin = () => {
    setIsAuth(true); // "Входим" в систему
    navigate(from, { replace: true }); // Возвращаем пользователя обратно
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Вход в систему</h1>
      <p>Нажмите на кнопку, чтобы получить доступ к управлению товарами.</p>
      <button 
        onClick={handleLogin}
        style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#ff4d94', color: 'white', border: 'none', borderRadius: '8px' }}
      >
        Войти как Администратор
      </button>
    </div>
  );
};

export default LoginPage;