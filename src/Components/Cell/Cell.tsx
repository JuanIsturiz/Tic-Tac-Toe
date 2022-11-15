import React, { useEffect, useState } from "react";
import { GameProps } from "../../types";
import "./Cell.css";

interface CellProps extends GameProps {
  cell: string;
  idx: number;
  check: string;
}

const Cell = ({
  cell,
  idx,
  onClick,
  current,
  winner,
  check,
  restart,
  gamemode,
  board,
}: CellProps) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (restart) {
      setClicked(false);
    }
  }, [restart]);

  useEffect(() => {
    if (gamemode !== "" && gamemode !== "one-player") return;
    if (board[idx] !== "") {
      setClicked(true);
    }
  }, [gamemode, board, idx]);

  const handleCellClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (winner || clicked) return;
    onClick(e);
    setClicked(true);
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (clicked) return;
    if (winner || clicked) return;
    const target = e.target as HTMLDivElement | any;
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", current === "X" ? "fa-x" : "fa-o");
    target.appendChild(icon);
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (winner || clicked) return;
    const target = e.target as HTMLDivElement;
    target.innerHTML = "";
  };

  return (
    <div
      id={String(idx)}
      className="Cell"
      onClick={handleCellClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {cell !== "" ? (
        cell === "X" ? (
          <i
            className="fa-solid fa-x"
            style={{
              color: winner ? check : "#095B53",
            }}
          ></i>
        ) : (
          <i
            className="fa-solid fa-o"
            style={{
              color: winner ? check : "#70012B",
            }}
          ></i>
        )
      ) : (
        cell
      )}
    </div>
  );
};

export default Cell;
