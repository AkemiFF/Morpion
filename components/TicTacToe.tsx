import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { checkWinner, getBestMove } from '../utils/computerLogic';

type Player = 'X' | 'O';
type Board = (Player | null)[];
type GameState = {
  board: Board;
  currentPlayer: Player;
  winner: Player | 'draw' | null;
  winningLine: number[] | null;
  moves: { player: Player; position: number }[];
};

interface TicTacToeProps {
  initialPlayerSymbol: Player;
}

const TicTacToe: React.FC<TicTacToeProps> = ({ initialPlayerSymbol }) => {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: initialPlayerSymbol,
    winner: null,
    winningLine: null,
    moves: [],
  });

  const computerSymbol: Player = initialPlayerSymbol === 'X' ? 'O' : 'X';

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const computerTurn = () => {
    const move = getBestMove(gameState.board, computerSymbol, initialPlayerSymbol);
    if (move !== -1) {
      const newBoard = [...gameState.board];
      newBoard[move] = computerSymbol;

      const winner = checkWinner(newBoard);
      const winningLine = winner ? findWinningLine(newBoard, winner) : null;

      setGameState(prevState => ({
        ...prevState,
        board: newBoard,
        currentPlayer: initialPlayerSymbol,
        winner,
        winningLine,
        moves: [...prevState.moves, { player: computerSymbol, position: move }],
      }));
    }
  };

  useEffect(() => {
    if (gameState.currentPlayer === computerSymbol && !gameState.winner) {
      setTimeout(() => computerTurn(), 500);
    }
  }, [computerSymbol, computerTurn, gameState.currentPlayer, gameState.winner]);

  const handleCellClick = (index: number) => {
    if (gameState.board[index] || gameState.winner || gameState.currentPlayer !== initialPlayerSymbol) return;

    const newBoard = [...gameState.board];
    newBoard[index] = initialPlayerSymbol;

    const winner = checkWinner(newBoard);
    const winningLine = winner ? findWinningLine(newBoard, winner) : null;

    setGameState(prevState => ({
      ...prevState,
      board: newBoard,
      currentPlayer: computerSymbol,
      winner,
      winningLine,
      moves: [...prevState.moves, { player: initialPlayerSymbol, position: index }],
    }));
  };

  const findWinningLine = (board: Board, winner: "draw" | Player): number[] | null => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === winner && board[b] === winner && board[c] === winner) {
        return combination;
      }
    }
    return null;
  };

  const restartGame = () => {
    setGameState({
      board: Array(9).fill(null),
      currentPlayer: initialPlayerSymbol,
      winner: null,
      winningLine: null,
      moves: [],
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900">
      <motion.h1
        className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Tic-Tac-Toe
      </motion.h1>
      {!gameState.winner && (
        <motion.div
          className="text-2xl mb-6 text-cyan-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {gameState.currentPlayer === initialPlayerSymbol ? "Votre tour" : "Tour de l'ordinateur"}
        </motion.div>
      )}
      {gameState.winner && (
        <motion.div
          className="text-3xl mb-6 font-bold text-purple-300"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          {gameState.winner === 'draw' ? 'Match nul !' : `Le joueur ${gameState.winner} a gagné !`}
        </motion.div>
      )}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {gameState.board.map((cell, index) => (
          <motion.div
            key={index}
            className={`w-24 h-24 border-2 rounded-lg cursor-pointer flex items-center justify-center text-4xl font-bold
                        ${gameState.winningLine?.includes(index) ? 'border-yellow-400 shadow-[0_0_15px_rgba(255,255,0,0.7)]' : 'border-cyan-500 shadow-[0_0_10px_rgba(0,255,255,0.3)]'}
                        ${!cell ? 'hover:bg-cyan-900 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]' : ''}`}
            onClick={() => handleCellClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            {cell && (
              <motion.span
                className={`${cell === 'X' ? 'text-red-500' : 'text-blue-500'}`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {cell}
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={restartGame}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded"
        >
          Recommencer
        </Button>
      </motion.div>
      <h6 className="bg-cyan-500 text-white text-sm">@by BradAke</h6>
    </div>

  );
};

export default TicTacToe;

