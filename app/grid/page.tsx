"use client";

import { useState } from "react";

const directions = [
  [-1, 0], [1, 0], [0, -1], [0, 1],   // cardinal directions
  [-1, -1], [-1, 1], [1, -1], [1, 1]  // diagonal directions
];

export default function GridGame() {
  // Initialize grid with values 1, 2, 1, -1, 2, -1, 1, 2, 1
  const [grid, setGrid] = useState([1, 3, 2, -1, 3, -2, 1, 3, 2]);

  // Handle square click
  function handleClick(index: number) {
    const newGrid = [...grid];

    // Get the value of the clicked square
    const value = newGrid[index];
    if (value === 0) return; // If the value is already 0, don't do anything

    // Set the clicked square to 0
    newGrid[index] = 0;

    // Get the row and column of the clicked square
    const row = Math.floor(index / 3);
    const col = index % 3;

    // Add the value of the clicked square to adjacent squares
    directions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
      const adjIndex = newRow * 3 + newCol;

      // Check if the adjacent square is within bounds
      if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3) {
        newGrid[adjIndex] += value;
      }
    });

    // Update the grid
    setGrid(newGrid);
  }

  // When the grid is all 0s, show a message
  if (grid.every((cell) => cell === 0)) {
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
        <div>Level Complete!</div>
        <div>Refresh to play again.</div>
      </div>
    );
  }

  // If there are no negative numbers in the grid, show a message
  if (grid.every((cell) => cell >= 0)) {
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
        <div>No possible moves!</div>
        <div>Refresh to play again.</div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // Centers horizontally
        alignItems: "center", // Centers vertically
        height: "100vh", // Makes the div take full height of the screen
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
