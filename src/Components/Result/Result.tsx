import "./Result.css";

interface Props {
  clicks: number;
  winner: string;
  gamemode: string;
}

const Result = ({ clicks, winner, gamemode }: Props) => {
  return (
    <div className="Result">
      {(gamemode === "one-player" && clicks > 4 && !winner) ||
      (clicks > 8 && !winner) ? (
        <h1>The game was a draw</h1>
      ) : winner ? (
        <h1>
          <i
            className={`fa-solid ${winner === "X" ? "fa-x" : "fa-o"}`}
            style={{ color: winner === "X" ? "#095B53" : "#70012B" }}
          ></i>{" "}
          's WON!!
        </h1>
      ) : null}
    </div>
  );
};

export default Result;
