import React, { useState } from 'react';
import Board from './Board';
import './App.css';

const App = () => {
  const [history, setHistory] = useState([{                  // squares 라는 객체에 null 로 채워진 Array를 값으로 주고, 그 객체를 배열에 담은 상태
    squares: Array(9).fill(null),
}]);
  const [stepNumber, setStepNumber] = useState(0);           // 한번 클릭할때 마다 그 단계를 Number 로 가지고 있는 상태
  const [xIsNext, setXIsNext] = useState(true);              // X 와 O 가 반복 될때, 다음 차례가 무엇인지 알려주는 상태
  // const [autoTimeWarp, setAutoTimeWarp] = useState(false);   
  // const [test, setTest] = useState(current.squares);



  const handleClick = (n) => {                               // 네모칸 클릭시 발생하는 이벤트함수
    const newHistory = history.slice(0, stepNumber + 1);     // slice()로 민들어진 새로운 배열에 인덱스가 1개부터 9개까지 생성되는 배열이 인덱스가 되어 생성된다. (2차원배열) 
    const current = newHistory[newHistory.length - 1];       // 위의 newHistory 의 인덱스 (배열) 를 추출하는 변수이다.
    const squares = current.squares.slice();                 // current 내부의 squares 값 (배열) 을 가지고 slice 한 새로운 배열을 뽑아내는 변수
    // console.log(squares)

    if(calculateWinner(squares) || squares[n]) return;       // calculateWinner 가 동작하거나 (승자결정), 클릭한 칸에 이미 값이 채워져 있다면 null 을 반환해 클릭해도 이벤트가 안나는 것 처럼 보이게 한다.
    squares[n] = xIsNext ? "X" : "O"                         // squares에 들어가는 값은 xIsNext 가 true 라면 "X"를, false 라면 "O" 가 들어간다. 

    setHistory(newHistory.concat([{squares: squares,}]));    // 2차원배열 history을 newHistory에 concat으로 squares 배열을 추가한다. 클릭할때마다 갱신된다.   
    setStepNumber(newHistory.length);                        // stepNumber의 값을 하나씩 올려준다. newHistory 가 하나씩 증가하기때문이다.
    setXIsNext(!xIsNext)                                     // 클릭할때마다 xIsNext의 상태가 true -> false -> true 로 계속 번갈아가며 바뀐다. 
};

const jumpTo = (step) => {                                   // jumpTo 함수는 step 이란 인자를 받는다.
  setStepNumber(step);                                       // 이 함수는 전달받은 인자로 stepNumber를 변화시킨다. 그렇다면 Number 타입이라는 유추가 가능하다.
  setXIsNext((step % 2) === 0);                              // xIsNext 의 상태를 시간이동의 순서에 따라 변환시켜야 한다. 클릭한 step을 2로 나누어 0과 1만으로 값을 만든 후 0과 동일한지 아닌지를 boolean 으로 받는다.
};

const current = history[stepNumber];                         // history의 stepNumber 번째 인덱스를 가져오는 변수, 위의 current 와는 다르다.
const winner = calculateWinner(current.squares);             // 승자를 표시하는 변수, calculateWinner 함수에 current.squares 를 인자로 주었을때 생기는 결과값을 반환한다.
console.log(winner)

const moves = history.map((step, move) => {                  // history 배열을 순회하는 map을 주고 move (index) 를 사용한다.
  const desc = move ?                                        // desc라는 변수는 move가 존재한다면 (1이상이라면) Go to move # ~ 을 출력하고, 0이라면 Go to game start 를 출력한다.
      'Go to move # ' + move :                               // Go to game start 는 시작전부터 존재한다.
      'Go to game start';

   
  return (
    <>
      {/* React는 key prop을 사용하여 컴포넌트와 DOM 요소 간의 관계를 생성한다. 리액트 라이브러리는 이 관계를 이용해 컴포넌트 리렌더링 여부를 결정한다. 
          불필요한 리렌더링을 방지하기 위해서는 각 자식 컴포넌트마다 독립적인 key값을 넣어줘야 한다. => li 태그안에 move가 key 로 들어가는 이유 */}
      <li key={move}>             
          {/* 버튼에 클릭이벤트를 준 다음, 클릭을 하게 되면 jumpTo 함수에 move (index) 인자를 주어 실행시킨다. jumpTo 함수에서는 step으로 표기했다.
          그리고 위에 만든 변수 desc 를 button 내부 텍스트로 채워넣는다. */}
          <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    </>
  )
});



// console.log(setState())


let status;                                                   // 값이 없는 변수 status 를 선언한다.
if (winner) {                                                 // 만약 승자가 생긴다면 status 에 Winner: 승자 를 표시하고
    status = 'Winner: ' + winner;
} else {                                                      // 아직 승자가 없다면 Next player: X or O 를 표시한다.
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
                <ol>{moves}</ol>
            </div>
            {/* <button onClick={setState}>TimeWarp</button> */}
        </>
    )
    
}

const calculateWinner = (squares) => {      // 승자를 정하는 함수.
  const lines = [                           // 승리가 정해지는 경우를 가지고 있는 배열
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {  // line 배열을 순환하는 반복문을 만든다
      const [a, b, c] = lines[i];           // line 의 인덱스 배열을 임의의 배열로 지정하고 조건을 부여한다.
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {  
          return squares[a];
      }
  }
  return null;
};

export default App


// Advenced : 게임을 진행하고 history 가 쌓였을때, 클릭하면 history 가 자동으로 1번부터 재생되는 버튼을 만들어라. 

// sudoCode : setInterval 을 사용해서 자동으로 클릭이 되게 할까? 쌓여있는 history 를 차례대로 실행시켜서 띄워볼까.
// 