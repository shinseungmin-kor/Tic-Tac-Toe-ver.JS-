import React, { useState } from 'react';
import Board from './Board';
import './App.css';

const App = () => {
  const [history, setHistory] = useState(Array(9).fill(null))

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