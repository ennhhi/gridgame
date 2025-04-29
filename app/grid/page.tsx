"use client";

import { useState, useEffect } from "react";

const directions = [
  [-1, 0], [1, 0], [0, -1], [0, 1],   // cardinal directions
  [-1, -1], [-1, 1], [1, -1], [1, 1]  // diagonal directions
];

// Define multiple levels
const levels = [
  [-1, -1, -1, -1, 1, -1, -1, -1, -1], // Level 1
  [0, 0, 1, 0, 0, 0, -1, 0, 0], // Level 2
  [1, 0, 2, 0, -10, 0, 3, 0, 4], // Level 3
  [8, 0, 8, 0, -24, 8, 8, 0, 0], // Level 4
  [7, -7, 2, -8, -8, -3, -1, 2, 0], // Level 5
];

// Define inactive squares for each level
const inactiveSquaresPerLevel = [
  [0, 2, 6, 8],       // Level 1
  [0, 1, 3, 5, 7, 8], // Level 2
  [1, 3, 5, 7],       // Level 3
  [1, 3] ,            // Level 4
  [],                 // Level 5
];

export default function GridGame() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [grid, setGrid] = useState([...levels[currentLevel]]);
  const [showResult, setShowResult] = useState(false); // New state for delaying result screen
  const [inactiveSquares, setInactiveSquares] = useState<number[]>(inactiveSquaresPerLevel[currentLevel]); // Track deactivated squares

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

  function nextLevel() {
    if (currentLevel < levels.length - 1) {
      const nextLevelIndex = currentLevel + 1;
      setCurrentLevel(nextLevelIndex);
      setGrid([...levels[nextLevelIndex]]);
      setInactiveSquares([...inactiveSquaresPerLevel[nextLevelIndex]]); // Update inactive squares for the next level
    } else {
      resetGame(); // If it's the last level, restart from level 1
    }
  }

  function resetLevel() {
    setGrid([...levels[currentLevel]]);
    setInactiveSquares([...inactiveSquaresPerLevel[currentLevel]]); // Reset inactive squares for the current level
  }

  function resetGame() {
    setCurrentLevel(0);
    setGrid([...levels[0]]);
    setInactiveSquares([...inactiveSquaresPerLevel[0]]); // Reset inactive squares for the first level
  }

  const allZeros = grid
    .filter((_, index) => !inactiveSquares.includes(index)) // Ignore inactive squares
    .every((cell) => cell === 0);

  const onlyPositives = grid
    .filter((_, index) => !inactiveSquares.includes(index)) // Ignore inactive squares
    .every((cell) => cell >= 0);

  const onlyNegatives = grid
    .filter((_, index) => !inactiveSquares.includes(index)) // Ignore inactive squares
    .every((cell) => cell <= 0);

  const noMovesLeft = onlyPositives || onlyNegatives;

  useEffect(() => {
    if (allZeros || noMovesLeft) {
      setTimeout(() => setShowResult(true), 1000); // Delay result screen by 1 second
    } else {
      setShowResult(false);
    }
  }, [allZeros, noMovesLeft]);

  // Check if the user completed the final level
  const isGameCompleted = allZeros && currentLevel === levels.length - 1 && showResult;

  if (isGameCompleted) {
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
        <div>Congratulations! You beat all 5 levels!</div>
        <button
          onClick={() => (window.location.href = "/")}
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
          Home
        </button>
      </div>
    );
  }

  if ((allZeros || noMovesLeft) && showResult) {
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
        <div>
          {allZeros
            ? `Level ${currentLevel + 1} Complete!`
            : "No possible moves!"}
        </div>
        <button
          onClick={allZeros ? nextLevel : resetLevel}
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
          {allZeros ? "Next Level" : "Restart"}
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#000",
        color: "white",
      }}
    >
      <h2
        style={{
          alignItems: "center",
          fontFamily: "Calibri, sans-serif",
          fontSize: "32px",
          color: "#177fbf",
          marginBottom: "20px",
          textShadow: "2px 2px 4px #000",
        }}
    >
        Level {currentLevel + 1}
    </h2>
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
            disabled={inactiveSquares.includes(index)} // Disable button if it's in inactiveSquares
            style={{
              width: "100px",
              height: "100px",
              fontSize: "24px",
              backgroundColor: inactiveSquares.includes(index) ? "transparent" : "black", // Make invisible
              border: inactiveSquares.includes(index) ? "none" : "2px solid white", // Remove border
              color: inactiveSquares.includes(index) ? "transparent" : "white", // Hide text
              cursor: inactiveSquares.includes(index) ? "default" : "pointer", // Disable pointer
            }}
          >
            {cell}
          </button>
        ))}
      </div>
    </div>
  );
}
