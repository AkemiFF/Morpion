"use client"
import React, { useState } from 'react'
import PlayerSymbolChoice from '../components/PlayerSymbolChoice'
import TicTacToe from '../components/TicTacToe'

const Home: React.FC = () => {
  const [playerSymbol, setPlayerSymbol] = useState<'X' | 'O' | null>(null)

  const handleSymbolChoice = (symbol: 'X' | 'O') => {
    setPlayerSymbol(symbol)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      {playerSymbol ? (
        <TicTacToe initialPlayerSymbol={playerSymbol} />
      ) : (
        <PlayerSymbolChoice onChoose={handleSymbolChoice} />
      )}
    </div>
  )
}

export default Home

