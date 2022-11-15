import { GameProps } from "../../types";
import Cell from "../Cell/Cell";
import "./Board.css";

interface BoardProps extends GameProps {
  condition: boolean;
  xPlayer: boolean[];
  oPlayer: boolean[];
  win: boolean[];
}

const Board = ({
  condition,
  board,
  onClick,
  current,
  winner,
  xPlayer,
  oPlayer,
  win,
  restart,
  gamemode,
}: BoardProps) => {
  const player = winner === "X" ? xPlayer : oPlayer;
  return (
    <>
      {condition && (
        <div className="Board">
          {board.map((cell: string, idx: number) => {
            const check =
              winner && player[idx] === true && win[idx] === player[idx];
            return (
              <Cell
                cell={cell}
                check={check ? "yellow" : ""}
                key={idx}
                idx={idx}
                onClick={onClick}
                current={current}
                winner={winner}
                restart={restart}
                gamemode={gamemode}
                board={board}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Board;
