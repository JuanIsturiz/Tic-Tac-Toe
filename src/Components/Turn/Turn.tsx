import "./Turn.css";

interface Props {
  condition: boolean;
  clicks: number;
  current: string;
  winner: string;
}
const Turn = ({ condition, clicks, current, winner }: Props) => {
  return (
    <>
      {condition && (
        <div className="Turn">
          {clicks > 8 ||
            (!winner && (
              <h2>
                Player{" "}
                <i
                  className={`fa-solid ${current === "X" ? "fa-x" : "fa-o"}`}
                  style={{ color: current === "X" ? "#095B53" : "#70012B" }}
                ></i>{" "}
                turn
              </h2>
            ))}
        </div>
      )}
    </>
  );
};

export default Turn;
