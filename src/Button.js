import React, { useEffect, useState } from 'react';
import './Button.css'

const Button = ({ squares, setSquares }) => {
    // x, o 가 들어갈 버튼을 만든다. Board 에서 9개로 늘린다.
    // button을 클릭했을때 value 를 X 로 바꿔주는 함수
    // 무엇을 클릭하던지 그것 하나만 바뀌어야 한다.
    const [a, setA] = useState(null);

    // console.log(renderSquare)
    const setStateHandler = () => {
        setA(squares)
    }

    return (
        <>
            <div 
            className='button'
            onClick={setStateHandler}
            >
                {a}
            </div>
        </>
    )
}

export default Button;