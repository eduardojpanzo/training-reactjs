import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { todoSlice } from "../store";

export function AddTodo() {
  const [newTodo, setNewTodo] = useState("");
  const disspath = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    disspath(todoSlice.actions.add(newTodo));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Novo Todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
