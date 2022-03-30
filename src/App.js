import React, { useState } from 'react';
import Board from './Board';
import './App.css';

const App = () => {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (n) => {
    const sliceSq = square.slice();
    if(calculateWinner(square) || square[n]) return;
    sliceSq[n] = xIsNext ? "X" : "O"
    setSquare(sliceSq)
    setXIsNext(!xIsNext)
};

const calculateWinner = (squares) => {
  const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
      }
  }
  return null;
};

    return(
        <>
          <div className='App'>
          <h2>Tic - Tac - Toe</h2>
            <Board />
            </div>
        </>
    )
    
}

export default App