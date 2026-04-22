import { useRef } from "react";

const LabRefCounter = () => {
  // 1. Храним число в useRef, чтобы изменения не вызывали ререндер компонента
  const countRef = useRef(0);
  
  // 2.пустая ссылка на DOM-элемент (div), чтобы менять его текст напрямую
  const divRef = useRef(null);

  const handleIncrement = () => {
    // Увеличиваем значение в контейнере .current
    countRef.current += 1;
    
    // Обновляем текст на экране напрямую через нативный JS
    if (divRef.current) {
      divRef.current.textContent = `Счетчик (useRef): ${countRef.current}`;
    }
    console.log("Значение выросло, но React не перерисовал компонент!");
  };

  const handleReset = () => {
    // Сбрасываем значение
    countRef.current = 0;
    
    // Обнуляем текст в DOM
    if (divRef.current) {
      divRef.current.textContent = `Счетчик (useRef): 0`;
    }
  };

  return (
    <div style={{ 
      padding: "20px", 
      border: "1px solid #ccc", 
      borderRadius: "10px", 
      margin: "10px 0",
      backgroundColor: "#f9f9f9",
      color: "#333" 
    }}>
      <h3>Задача 1: useRef</h3>
      {/* Привязываем ссылку к div */}
      <div ref={divRef} style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
        Счетчик (useRef): 0
      </div>
      
      <button onClick={handleIncrement} style={{ marginRight: "10px" }}>+1</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default LabRefCounter;