import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomeView: React.FC = () => {
  const navigate = useNavigate()

  const scoresString = localStorage.getItem('catPettingScores')
  const scores = scoresString ? JSON.parse(scoresString) : []
  const topScores = scores.sort((a: any, b: any) => b.score - a.score).slice(0, 5)

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-white text-center px-6">
      <img
        src="/oiia-cat.gif"
        alt="Gatito animado"
        className="w-40 h-40 mb-4"
      />

      <h1 className="text-4xl font-semibold text-gray-800 mb-4">
        Acaricia al Gatito 🐱
      </h1>
      <p className="text-base text-gray-600 mb-8 max-w-md">
        Tienes 30 segundos para acariciar al gatito tantas veces como puedas. Haz clic sobre él rápidamente y suma puntos con cada caricia. 🐾
      </p>

      <button
        onClick={() => navigate('/viewpoint')}
        className="bg-gray-900 hover:bg-gray-900 text-gray font-semibold py-3 px-8 rounded-md transition duration-200 mb-6"
      >
        Comenzar
      </button>
      <button
        onClick={() => navigate('/HardMode')}
        className="bg-pink-500 hover:bg-pink-600 text-gray font-semibold py-3 px-8 rounded-md transition duration-200 mb-6"
      >
        Gatito enjado 😾
      </button>

      {topScores.length > 0 && (
        <div className="w-full max-w-md bg-pink-100 border border-pink-300 rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold text-pink-700 mb-2">Top 5 puntajes</h2>
          <table className="w-full text-sm text-left text-pink-900">
            <thead>
              <tr className="border-b border-pink-300">
                <th className="py-1">Jugador</th>
                <th className="py-1 text-right">Puntaje</th>
              </tr>
            </thead>
            <tbody>
              {topScores.map((s: any, i: number) => (
                <tr key={i} className="border-b border-pink-200">
                  <td className="py-1 font-medium">{s.name}</td>
                  <td className="py-1 text-right">{s.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <footer className="absolute bottom-4 text-gray-400 text-xs font-mono">
        © 2025 Gatito Game - SENA SOFT - ANDRES LASSO
      </footer>
    </div>
  )
}

export default HomeView
