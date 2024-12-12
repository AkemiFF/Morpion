type Player = 'X' | 'O';
type Board = (Player | null)[];

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

export const getBestMove = (board: Board, computerSymbol: Player, playerSymbol: Player): number => {
  // Rule 1: Check if computer can win
  const winMove = findWinningMove(board, computerSymbol);
  if (winMove !== -1) return winMove;

  // Rule 2: Block player's winning move
  const blockMove = findWinningMove(board, playerSymbol);
  if (blockMove !== -1) return blockMove;

  // Rule 3: Take center if open
  if (board[4] === null) return 4;

  // Rule 4: Take opposite corner
  const oppositeCornerMove = takeOppositeCorner(board, playerSymbol);
  if (oppositeCornerMove !== -1) return oppositeCornerMove;

  // Rule 5: Block double threat
  const blockDoubleThreatMove = blockDoubleThreat(board, playerSymbol);
  if (blockDoubleThreatMove !== -1) return blockDoubleThreatMove;

  // Rule 6: Take any open corner
  const cornerMove = takeOpenCorner(board);
  if (cornerMove !== -1) return cornerMove;

  // Rule 7: Take any open space
  return board.findIndex(cell => cell === null);
};

const findWinningMove = (board: Board, player: Player): number => {
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      const testBoard = [...board];
      testBoard[i] = player;
      if (checkWinner(testBoard) === player) return i;
    }
  }
  return -1;
};

const takeOppositeCorner = (board: Board, playerSymbol: Player): number => {
  const oppositeCorners = [[0, 8], [2, 6]];
  for (const [a, b] of oppositeCorners) {
    if (board[a] === playerSymbol && board[b] === null) return b;
    if (board[b] === playerSymbol && board[a] === null) return a;
  }
  return -1;
};

const blockDoubleThreat = (board: Board, playerSymbol: Player): number => {
  const edges = [1, 3, 5, 7];
  if ((board[0] === playerSymbol && board[8] === playerSymbol) ||
    (board[2] === playerSymbol && board[6] === playerSymbol)) {
    return edges.find(i => board[i] === null) ?? -1;
  }
  return -1;
};

const takeOpenCorner = (board: Board): number => {
  const corners = [0, 2, 6, 8];
  return corners.find(i => board[i] === null) ?? -1;
};

export const checkWinner = (board: Board): Player | 'draw' | null => {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.every(cell => cell !== null) ? 'draw' : null;
};

