import { Provider as RedexProvider } from "react-redux";
import { store } from "./store";
import { Player } from "./pages/player";
import "./styles/global.css";

function App() {
  return (
    <div>
      <RedexProvider store={store}>
        <Player />
      </RedexProvider>
    </div>
  );
}

export default App;
