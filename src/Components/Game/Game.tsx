import { useEffect, useRef, useState } from "react";
import Board from "../Board/Board";
import { wins } from "../../utils/wins";
import { winCheck } from "../../utils/winCheck";
import Scoreboard from "../Scoreboard/Scoreboard";
import Turn from "../Turn/Turn";
import Result from "../Result/Result";
import Button from "../Button/Button";
import Options from "../Options/Options";
import "./Game.css";

const Game = () => {
  const [xPlayer, setXPlayer] = useState<Array<boolean>>(Array(9).fill(false));
  const [oPlayer, setOPlayer] = useState<Array<boolean>>(Array(9).fill(false));
  const [currentPlayer, setCurrentPlayer] = useState<string>("");
  const [winner, setWinner] = useState<string>("");
  const [clicks, setClicks] = useState<number>(0);
  const [win, setWin] = useState<Array<boolean>>([]);
  const [board, setBoard] = useState<Array<string>>(Array(9).fill(""));
  const [xPlayerPoints, setXPlayerPoints] = useState<number>(0);
  const [oPlayerPoints, setOPlayerPoints] = useState<number>(0);
  const [gamemode, setGamemode] = useState<string>("");
  const [restart, setRestart] = useState<boolean>(false);

  const xPlayerRef = useRef<boolean[]>(xPlayer);
  xPlayerRef.current = xPlayer;

  const oPlayerRef = useRef<boolean[]>(oPlayer);
  oPlayerRef.current = oPlayer;

  const boardRef = useRef<string[]>(board);
  boardRef.current = board;

  const currentPlayerRef = useRef<string>(currentPlayer);
  currentPlayerRef.current = currentPlayer;

  useEffect(() => {
    if (winCheck(xPlayer, wins).result) {
      setWin(winCheck(xPlayer, wins).winPass);
      setWinner("X");
      return;
    }
    if (winCheck(oPlayer, wins).result) {
      setWin(winCheck(oPlayer, wins).winPass);
      setWinner("O");
      return;
    }
  }, [xPlayer, oPlayer]);

  useEffect(() => {
    if (clicks > 8 && !winner) return;
    if (winner === "X") {
      setXPlayerPoints((prev) => prev + 1);
      return;
    }
    if (winner === "O") {
      setOPlayerPoints((prev) => prev + 1);
      return;
    }
  }, [winner, clicks]);

  useEffect(() => {
    const check =
      winCheck(xPlayerRef.current, wins).result ||
      winCheck(oPlayerRef.current, wins).result;
    if (check) return;
    if (gamemode !== "one-player") return;
    if (!clicks) return;
    if (clicks > 4) return;
    let idx = Math.floor(Math.random() * 10);
    while (boardRef.current[idx] !== "") {
      idx = Math.floor(Math.random() * 10);
    }
    if (currentPlayerRef.current === "X") {
      setCurrentPlayer("O");
      setBoard((prev) => {
        prev[idx] = "X";
        return [...prev];
      });
      setOPlayer((prev) => {
        prev[idx] = true;
        return [...prev];
      });
      return;
    }
    if (currentPlayerRef.current === "O") {
      setCurrentPlayer("X");
      setBoard((prev) => {
        prev[idx] = "O";
        return [...prev];
      });
      setOPlayer((prev) => {
        prev[idx] = true;
        return [...prev];
      });
      return;
    }
  }, [clicks, gamemode, winner]);

  useEffect(() => {
    if (restart) {
      setRestart(false);
    }
  }, [restart]);

  const handleCellClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (winner) return;
    const target = e.target as HTMLDivElement;
    setClicks((prev) => prev + 1);
    setBoard((prev) => {
      prev[Number(target.id)] = currentPlayer;
      return [...prev];
    });
    if (currentPlayer === "X") {
      setXPlayer((prev) => {
        prev[Number(target.id)] = true;
        return [...prev];
      });
      setCurrentPlayer("O");
    }
    if (currentPlayer === "O") {
      setOPlayer((prev) => {
        prev[Number(target.id)] = true;
        return [...prev];
      });
      setCurrentPlayer("X");
    }
  };

  const handleRoundRestart = () => {
    if (gamemode === "one-player") {
      setCurrentPlayer("X");
    }
    setRestart(true);
    setBoard(Array(9).fill(""));
    setXPlayer(Array(9).fill(false));
    setOPlayer(Array(9).fill(false));
    setWinner("");
    setClicks(0);
  };
  const handleRestart = () => {
    handleRoundRestart();
    setCurrentPlayer("X");
    setXPlayerPoints(0);
    setOPlayerPoints(0);
  };

  const handleGamemode = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = e.target as HTMLDivElement;
    setCurrentPlayer("X");
    setGamemode(target.id);
  };

  const handleHome = () => {
    handleRestart();
    setGamemode("");
  };
  return (
    <>
      <Options
        condition={gamemode === ""}
        gamemode={gamemode}
        buttonOnClick={handleGamemode}
      />
      <div className="Game">
        <Board
          condition={gamemode !== ""}
          board={board}
          onClick={handleCellClick}
          current={currentPlayer}
          winner={winner}
          xPlayer={xPlayer}
          oPlayer={oPlayer}
          win={win}
          restart={restart}
          gamemode={gamemode}
        />
        <div className="right-column">
          <Scoreboard
            condition={gamemode !== ""}
            xPoints={xPlayerPoints}
            oPoints={oPlayerPoints}
          />
          <div className="buttons">
            <Button
              condition={
                (gamemode === "one-player" && clicks > 4) ||
                winner !== "" ||
                clicks > 8
              }
              onClick={handleRoundRestart}
              value={"Next Round"}
              id="next-round"
            />
            <Button
              condition={clicks > 0 || !!xPlayerPoints || !!oPlayerPoints}
              onClick={handleRestart}
              value={"Restart"}
              id="restart"
            />
          </div>
        </div>
      </div>
      <div className="bottom-row">
        <Result clicks={clicks} winner={winner} gamemode={gamemode} />
        <Turn
          condition={gamemode === "two-players"}
          clicks={clicks}
          current={currentPlayer}
          winner={winner}
        />
      </div>
      <Button
        condition={gamemode !== ""}
        onClick={handleHome}
        value={"Go Home"}
        id={"home"}
      />
    </>
  );
};

export default Game;
