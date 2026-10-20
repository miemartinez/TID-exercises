import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "parse/dist/parse.min.js";

import {
  fetchTodosForList,
  createTodo,
  setTodoDone,
  deleteTodo,
} from "../service/todoService";
import NewTodoForm from "../components/NewTodoForm";
import ToDoItem from "../components/ToDoItem";

const Parse = window.Parse;
const List = Parse.Object.extend("List");

export default function ListPage() {
  const { listId } = useParams();

  const [list, setList] = useState(null);
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadList() {
      try {
        const listQuery = new Parse.Query(List);
        const list = await listQuery.get(listId);
        setList(list);

        const todos = await fetchTodosForList(list);
        setTodos(todos);
      } catch (err) {
        // "Object not found": no such list, or its ACL does not let me read it
        setError(err.message);
      }
    }
    loadList();
  }, [listId]);

  async function handleAdd(newTask, list) {
    const newToDo = await createTodo(newTask, list);
    setTodos([...todos, newToDo]);
  }

  async function handleToggle(id) {
    const todo = todos.find((t) => t.id === id);
    await setTodoDone(id, !todo.done);
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  async function handleRemove(idToDelete) {
    await deleteTodo(idToDelete);
    setTodos(todos.filter((todo) => todo.id !== idToDelete));
  }

  if (!list) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Link to="/">← All lists </Link>
      <h1>
        <Link to={`/lists/${list.id}`}>{list.get("name")}</Link>
      </h1>

      <NewTodoForm list={list} onAdd={handleAdd} />
      <ul>
        {todos
          .filter((todo) => todo.list === list.id)
          .map((todo) => (
            <ToDoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onRemove={handleRemove}
            />
          ))}
      </ul>
    </div>
  );
}
