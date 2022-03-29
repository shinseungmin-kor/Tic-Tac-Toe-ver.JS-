import { useState } from 'react';
import './App.css';
import Board from './Board';

const App = () => {

  return (
    <div className="App">
      <h2>Tic - Tac - Toe</h2>
      <Board />
    </div>
  );
}

export default App;
