import Button from "../Button/Button";
import "./Options.css";

interface Props {
  condition: boolean;
  gamemode: String;
  buttonOnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const Options = ({ condition, gamemode, buttonOnClick }: Props) => {
  return (
    <>
      {condition && (
        <div className="Options">
          <h2>Select gamemode</h2>
          <div className="buttons">
            <Button
              condition={gamemode === ""}
              onClick={buttonOnClick}
              value={"One Player"}
              id="one-player"
            />
            <Button
              condition={gamemode === ""}
              onClick={buttonOnClick}
              value={"Two Players"}
              id="two-players"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Options;
