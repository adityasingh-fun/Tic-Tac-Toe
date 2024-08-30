import React, { useEffect, useState } from "react";
import "./style.css";

const Styles = ({ value, onClick }) => {
  return <button className="play-button" onClick={onClick}>{value}</button>;
};

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [status, setStatus] = useState("");

  const handleRestartButton = ()=>{
    setSquares(Array(9).fill(''))
    setIsXTurn(true);
    setStatus("")
  }

  const handleOnClick = (getCurrentIndex) => {
    const copySquares = [...squares];
    if (getWinner(squares) || copySquares[getCurrentIndex]) return;
    copySquares[getCurrentIndex] = isXTurn ? "X" : "O";
    setSquares(copySquares);
    setIsXTurn(!isXTurn);
  };

  const getWinner = (squares) => {
    const winningPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningPattern.length; i++) {
      const [x, y, z] = winningPattern[i];
      if (
        squares[x] &&
        squares[x] === squares[y] &&
        squares[x] === squares[z]
      ) {
        return squares[x];
      }
    }
    return null;
  };

  useEffect(() => {
    if (getWinner(squares)) {
      setStatus(`${getWinner(squares)} Wins`);
    } else if (!getWinner(status) && squares.every((item) => item !== "")) {
      setStatus("Match Draw! Please Play Again!");
    } else {
      setStatus(`${isXTurn ? "X" : "O"}'s Turn`);
    }
  }, [isXTurn, squares]);

  return (
    <div className="tic-tac-toe-wrapper">
      <h1>Let's Play</h1>
      <div className="row">
        <Styles value={squares[0]} onClick={() => handleOnClick(0)} />
        <Styles value={squares[1]} onClick={() => handleOnClick(1)} />
        <Styles value={squares[2]} onClick={() => handleOnClick(2)} />
      </div>
      <div className="row">
        <Styles value={squares[3]} onClick={() => handleOnClick(3)} />
        <Styles value={squares[4]} onClick={() => handleOnClick(4)} />
        <Styles value={squares[5]} onClick={() => handleOnClick(5)} />
      </div>
      <div className="row">
        <Styles value={squares[6]} onClick={() => handleOnClick(6)} />
        <Styles value={squares[7]} onClick={() => handleOnClick(7)} />
        <Styles value={squares[8]} onClick={() => handleOnClick(8)} />
      </div>
      <h2>{status}</h2>
      <div className="restart">
        <button onClick={handleRestartButton}>Restart</button>
      </div>
    </div>          
  );
};

export default TicTacToe;
