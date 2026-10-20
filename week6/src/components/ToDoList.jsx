import { useState, useEffect } from "react";
import NewTodoForm from "./NewTodoForm";
import ToDoItem from "./ToDoItem";
import NewListForm from "./NewListForm";
import {
  fetchTodos,
  createTodo,
  setTodoDone,
  deleteTodo,
  fetchTodosForList,
} from "../service/todoService";
import { createList, fetchLists } from "../service/listService";

export default function ToDoList({ listTitle }) {
  const [todoList, setTodoList] = useState([]);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    async function load() {
      const allLists = await fetchLists();
      setLists(allLists);

      const allTodos = [];
      // here we have to use allLists even though we updated the state of lists as this is not immediately updated - why is that??
      for (const list of allLists) {
        const todos = await fetchTodosForList(list);
        allTodos.push(...todos);
      }
      setTodoList(allTodos);
    }
    load();
  }, []);

  async function handleAdd(text, list) {
    const newToDo = await createTodo(text, list);
    setTodoList([...todoList, newToDo]);
  }

  async function handleAddList(name) {
    const created = await createList(name);
    setLists([...lists, created]);
  }

  async function handleToggle(id) {
    const todo = todoList.find((t) => t.id === id);
    await setTodoDone(id, !todo.done);
    setTodoList(
      todoList.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }

  async function handleRemove(idToDelete) {
    await deleteTodo(idToDelete);
    setTodoList(todoList.filter((todo) => todo.id !== idToDelete));
  }

  return (
    <div className="todo-body">
      <h1>{listTitle}</h1>

      <NewListForm onAdd={handleAddList} />
      {lists.length === 0 ? (
        <p>No lists yet.</p>
      ) : (
        <ul>
          {lists.map(
            (
              list, //list is not a plain js object so we can't write list.name and instead have to .get() from the db
            ) => (
              <li key={list.id}>
                <h2>{list.get("name")}</h2>
                <NewTodoForm list={list} onAdd={handleAdd} />
                <ul>
                  {todoList
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
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
}
