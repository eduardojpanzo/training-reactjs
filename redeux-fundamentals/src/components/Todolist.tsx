import { useAppSelector } from "../store";

export function Todolist() {
  const todos = useAppSelector((store) => store.todo);
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo}>{todo}</li>
      ))}
    </ul>
  );
}
