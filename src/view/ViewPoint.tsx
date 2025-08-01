import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewPoint: React.FC = () => {
  const [position, setPosition] = useState({ x: 80, y: 80 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [gameEnded, setGameEnded] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const targetTimeRef = useRef<number>(900);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const finalAudioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  const changePosition = () => {
    if (gameEnded) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const randomX = Math.random() * 80 + 10;
    const randomY = Math.random() * 70 + 10;
    setPosition({ x: randomX, y: randomY });

    timeoutRef.current = setTimeout(() => {
      changePosition();
    }, targetTimeRef.current);
  };

  const handlePet = () => {
    if (gameEnded) return;
    setScore((prev) => prev + 1);
    changePosition();
  };

  const endGame = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setGameEnded(true);

    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (finalAudioRef.current) {
      finalAudioRef.current.volume = 0.5;
      finalAudioRef.current.play();
    }
  };

  const saveScore = () => {
    if (!playerName.trim()) {
      alert('Por favor, ingresa tu nombre.');
      return;
    }
    const scoresString = localStorage.getItem('catPettingScores');
    const scores = scoresString ? JSON.parse(scoresString) : [];
    scores.push({ name: playerName.trim(), score });
    localStorage.setItem('catPettingScores', JSON.stringify(scores));
    navigate('/');
  };

  useEffect(() => {
    const gameTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(gameTimer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    changePosition();

    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {
        console.warn("El usuario debe interactuar para que el audio inicie.");
      });
    }

    return () => {
      clearInterval(gameTimer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-pink-100 via-white to-pink-200 text-black relative overflow-hidden font-sans">
      {/* Decoraciones visuales */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 text-4xl animate-bounce">🐾</div>
        <div className="absolute bottom-20 right-16 text-5xl animate-pulse">🐾</div>
        <div className="absolute top-1/2 left-1/4 text-3xl rotate-12 opacity-30">🧶</div>
        <div className="absolute bottom-1/4 right-1/3 text-4xl opacity-40">🐟</div>
        <div className="absolute top-1/3 right-1/5 text-2xl opacity-50">💤</div>
      </div>

      {/* HUD */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center border-b border-gray-300 bg-white/80 backdrop-blur-sm z-10">
        <span className="text-lg font-semibold text-pink-600">Caricias: {score}</span>
        <span className="text-lg font-semibold text-gray-800">Tiempo: {timeLeft}s</span>
      </div>

      {/* Gatito */}
      {!gameEnded && (
        <button
        onClick={handlePet}
        className="text-6xl transition-transform hover:scale-125 absolute drop-shadow-md z-10"
        style={{
          top: `${position.y}%`,
          left: `${position.x}%`,
          transform: 'translate(-50%, -50%)',
        }}
        >
        <audio ref={finalAudioRef} src="/atrapame/public/mew final.mp3" />
          🐱
        </button>
      )}

      {/* Pantalla final */}
      {gameEnded && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-20">
          <div className="bg-white border border-pink-400 rounded-xl p-8 w-full max-w-sm text-center shadow-xl">
            <h2 className="text-3xl font-bold text-pink-600 mb-4">¡Tiempo terminado!</h2>
            <p className="text-gray-700 text-lg mb-2">Caricias totales: <span className="font-bold">{score}</span></p>
            <input
              type="text"
              placeholder="Tu nombre"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4 text-center focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              onClick={saveScore}
              className="bg-gray-500 hover:bg-gray-900 text-gray font-semibold py-3 px-8 rounded-md transition duration-200 mb-6"
            >
              Guardar y salir
            </button>
            <div>
            <button
              onClick={()=> navigate('/')}
              className="bg-gray-900 hover:bg-gray-900 text-gray font-semibold py-3 px-8 rounded-md transition duration-200 mb-6"
            >
              salir
            </button>
            </div>
          </div>
        </div>
      )}

      {/* Música de fondo */}
      <audio ref={audioRef} src="/atrapame/public/Temple of Time.mp3" loop />

      {/* Música de cierre */}
      <audio ref={finalAudioRef} src="/atrapame/public/mew final.mp3" />
    </div>
  );
};

export default ViewPoint;
