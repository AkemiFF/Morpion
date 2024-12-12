import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

interface PlayerSymbolChoiceProps {
  onChoose: (symbol: 'X' | 'O') => void
}

const PlayerSymbolChoice: React.FC<PlayerSymbolChoiceProps> = ({ onChoose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">Choisissez votre symbole</h2>
      <div className="flex justify-center space-x-4">
        <Button
          onClick={() => onChoose('X')}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          X
        </Button>
        <Button
          onClick={() => onChoose('O')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          O
        </Button>
      </div>
    </motion.div>
  )
}

export default PlayerSymbolChoice

