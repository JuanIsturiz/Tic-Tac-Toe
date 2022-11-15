export interface GameProps {
  board: string[];
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  current: string;
  gamemode: string;
  restart: boolean;
  winner: string;
}
