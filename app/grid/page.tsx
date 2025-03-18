"use client";

import { useState } from "react";

const directions = [
  [-1, 0], [1, 0], [0, -1], [0, 1],   // cardinal directions
  [-1, -1], [-1, 1], [1, -1], [1, 1]  // diagonal directions
];

// Initial grid values
const initialGrid = [1, 3, 2, -1, 3, -2, 1, 3, 2];

export default function GridGame() {
  const [grid, setGrid] = useState([...initialGrid]);

  function handleClick(index: number) {
    const newGrid = [...grid];
    const value = newGrid[index];
    if (value === 0) return;

    newGrid[index] = 0;
    const row = Math.floor(index / 3);
    const col = index % 3;

    directions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
      const adjIndex = newRow * 3 + newCol;

      if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3) {
        newGrid[adjIndex] += value;
      }
    });

    setGrid(newGrid);
  }

  function resetGame() {
    setGrid([...initialGrid]); // Resets the grid to the initial state
  }

  // Winning or No Moves messages
  const allZeros = grid.every((cell) => cell === 0);
  const noMovesLeft = grid.every((cell) => cell >= 0);

  if (allZeros || noMovesLeft) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#000",
          color: "white",
          fontSize: "24px",
        }}
      >
        <div>{allZeros ? "Level Complete!" : "No possible moves!"}</div>
        <button
          onClick={resetGame}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "20px",
            backgroundColor: "#fff",
            color: "#000",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#000",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "5px",
        }}
      >
        {grid.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: "100px",
              height: "100px",
              fontSize: "24px",
              backgroundColor: "black",
              border: "2px solid white",
            }}
          >
            {cell}
          </button>
        ))}
      </div>
    </div>
  );
}
