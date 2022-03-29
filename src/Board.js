import React, { useEffect, useState } from 'react';
import Button from './Button';
import './Board.css'

const Board = () => {
    // 3x3 테이블을 만든다, 
    const [squares, setSquares] = useState(Array(9).fill(null));
    // console.log(squares)

    const renderSquare = (n) => {
        for(let i = 0; i < squares.length; i++) {
            squares[i] = "X"
        }
    }
    renderSquare();


    return (
        <>
            <div className='board_row'>
                <Button squares={squares[0]} />
                <Button squares={squares[1]} />
                <Button squares={squares[2]} />
            </div>
            <div className='board_row'>
                <Button squares={squares[3]} />
                <Button squares={squares[4]} />
                <Button squares={squares[5]} />
            </div>
            <div className='board_row'>
                <Button squares={squares[6]} />
                <Button squares={squares[7]} />
                <Button squares={squares[8]} />
            </div>
        </>
    )
}

export default Board;