import "./Button.css";

interface Props {
  condition: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  value: string;
  id: string;
}

const Button = ({ condition, onClick, value, id }: Props) => {
  return (
    <>
      {condition && (
        <button id={id} onClick={onClick}>
          {value}
        </button>
      )}
    </>
  );
};

export default Button;
