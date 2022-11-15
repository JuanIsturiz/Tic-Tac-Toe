import Game from "./Components/Game/Game";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <h1 id="title">Tic Tac Toe</h1>
      </header>
      <main>
        <Game />
      </main>
    </div>
  );
}

export default App;
