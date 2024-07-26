import { Provider as RedexProvider } from "react-redux";
import { AddTodo } from "./components/AddTodo";
import { Todolist } from "./components/Todolist";
import { store } from "./store";

function App() {
  return (
    <div>
      <RedexProvider store={store}>
        <Todolist />
        <AddTodo />
      </RedexProvider>
    </div>
  );
}

export default App;
