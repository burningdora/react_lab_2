import { useRef, forwardRef, useImperativeHandle } from "react";

// 1. Используем forwardRef, чтобы родитель мог получить доступ к этому компоненту
const MiniPlayer = forwardRef((props, ref) => {
  const audioRef = useRef(null); // Ссылка на сам элемент аудио

  // 2. Определяем, какие именно методы будут доступны родителю
  useImperativeHandle(ref, () => ({
    play: () => {
      audioRef.current.play();
    },
    pause: () => {
      audioRef.current.pause();
    },
    stop: () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Сброс трека в начало
    }
  }));

  return (
    <div style={{ padding: "10px", background: "#f0f0f0", borderRadius: "8px", color: "#333" }}>
      <p>🎵 Аудио-отзыв о товаре</p>
      {/* Скрытый элемент аудио */}
      
      <audio ref={audioRef}  src="/worry.mp3" />" 
    </div>
  );
});

export default MiniPlayer;