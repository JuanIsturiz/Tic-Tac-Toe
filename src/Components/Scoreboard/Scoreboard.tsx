import "./Scoreboard.css";

interface Props {
  condition: boolean;
  xPoints: number;
  oPoints: number;
}

const Scoreboard = ({ condition, xPoints, oPoints }: Props) => {
  return (
    <>
      {condition && (
        <div>
          <table>
            <thead>
              <tr>
                <th>
                  <i className="fa-solid fa-x" style={{ color: "#095B53" }}></i>{" "}
                  points
                </th>
                <th>
                  <i className="fa-solid fa-o" style={{ color: "#70012B" }}></i>{" "}
                  points
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{xPoints}</td>
                <td>{oPoints}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Scoreboard;
