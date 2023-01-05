import React, { useState } from "react";

const Board = () => {
  const [turn, setTurn] = useState("x");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState();
  //重置鍵
  const resetHandler = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
  };
  const checkForWinner = (squares) => {
    //判別井字陣列，垂直、水平、對角
    let combos = {
      horizontally: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      vertical: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };
    //檢查是否有連成線
    for (let combo in combos) {
      combos[combo].forEach((e) => {
        if (
          squares[e[0]] === "" ||
          squares[e[1]] === "" ||
          squares[e[2]] === ""
        ) {
        } else if (
          squares[e[0]] === squares[e[1]] &&
          squares[e[1]] === squares[e[2]]
        ) {
          setWinner(squares[e[0]]);
        }
      });
    }
  };
  //判別現在是圈或叉
  const clickHandler = (item) => {
    if (cells[item] !== "") {
      return;
    }
    let squares = [...cells];
    if (turn === "x") {
      squares[item] = "x";
      setTurn("o");
    } else {
      squares[item] = "o";
      setTurn("x");
    }
    checkForWinner(squares);
    setCells(squares);
  };
  //新增圈叉
  const Cell = ({ num }) => {
    return <td onClick={() => clickHandler(num)}>{cells[num]}</td>;
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </thead>
      </table>
      {winner == "nothing" && (
        <>
          <p>平手</p>
        </>
      )}
      {winner && (
        <>
          <p className="winner">{winner} is the winner</p>
        </>
      )}
      <p className="reset" onClick={resetHandler}>
        重新
      </p>
    </div>
  );
};

export default Board;
