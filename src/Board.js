import React, { useEffect, useState } from 'react';
import Button from './Button';

import './Board.css'

const Board = () => {
    

    

    const renderSquare = (n) => {
        return (
            <>
                <Button
                    vlaue={square[n]}
                    onCick={() => handleClick(n)}
                />
            </>
        )
    };

    

    const winner = calculateWinner(square);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div>
            <div className='status'>{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

export default Board;