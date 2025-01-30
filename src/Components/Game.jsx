import { useState } from "react";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [status, setStatus] = useState("X's turn");

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (newBoard) => {
    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setStatus(`${newBoard[a]} wins!`);
        return true;
      }
    }
    if (!newBoard.includes("")) {
      setStatus("It's a draw!");
      return true;
    }
    return false;
  };

  const handleClick = (index) => {
    if (board[index] || status.includes("wins")) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    
    if (!checkWinner(newBoard)) {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      setStatus(`${currentPlayer === "X" ? "O" : "X"}'s turn`);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setStatus("X's turn");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Tic-Tac-Toe</h1>
      <p className="mb-4 text-lg">{status}</p>
      <div className="grid grid-cols-3 gap-2 w-64">
        {board.map((cell, index) => (
          <button
            key={index}
            className="w-20 h-20 bg-gray-700 text-2xl font-bold flex items-center justify-center border border-gray-500 hover:bg-gray-600 transition duration-200"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={resetGame}
      >
        Restart Game
      </button>
    </div>
  );
};

export default Game;
