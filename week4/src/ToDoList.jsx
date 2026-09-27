import { useState, useEffect } from "react";
import NewTodoForm from "./NewTodoForm.jsx";
import TodoItem from "./TodoItem.jsx";
import {
  fetchTodos,
  createTodo,
  setTodoDone,
  deleteTodo,
} from "./service/todoService.js";

export default function ToDoList({ firstName }) {
  let h1Style = { color: "deeppink", backgroundColor: "white" };
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function load() {
      setTodos(await fetchTodos());
    }
    load();
  }, []);

  async function handleAdd(text) {
    const created = await createTodo(text);
    setTodos([...todos, created]);
  }

  async function handleDelete(idToDelete) {
    await deleteTodo(idToDelete);
    setTodos(todos.filter((each) => each.id !== idToDelete));
  }

  async function handleToggle(id) {
    const todo = todos.find((t) => t.id === id);
    await setTodoDone(id, !todo.done);
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  return (
    <>
      <h1 style={h1Style}>To Do List for {firstName}</h1>
      <NewTodoForm onAdd={handleAdd} />

      {todos.length === 0 ? (
        <p>Nothing to do. Enjoy the afternoon!</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onRemove={handleDelete}
              onToggle={handleToggle}
            />
          ))}
        </ul>
      )}
    </>
  );
}
