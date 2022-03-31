import React, { useState } from 'react';
import Board from './Board';
import './App.css';

const App = () => {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
}]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (n) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    if(calculateWinner(squares) || squares[n]) return;
    squares[n] = xIsNext ? "X" : "O"

    setHistory(newHistory.concat([{squares: squares,}]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext)
};

const jumpTo = (step) => {
  setStepNumber(step);
  setXIsNext((step % 2) === 0);
};

const current = history[stepNumber];
const winner = calculateWinner(current.squares);

const moves = history.map((step, move) => {
  const desc = move ?
      'Go to move #' + move :
      'Go to game start';
  return (
      <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
  )
})


let status;
if (winner) {
    status = 'Winner: ' + winner;
} else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
}


    return(
        <>
          <div className='App'>
          <h2>Tic - Tac - Toe</h2>
          <div className='status'>{status}</div>
            <Board 
              square={current.squares}
              handleClick={handleClick}
            />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </>
    )
    
}

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

export default App


// Advenced : 게임을 진행하고 history 가 쌓였을때, 클릭하면 history 가 자동으로 1번부터 재생되는 버튼을 만들어라. 