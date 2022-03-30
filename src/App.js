import React, { useState } from 'react';
import Board from './Board';
import './App.css';

const App = () => {
  

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