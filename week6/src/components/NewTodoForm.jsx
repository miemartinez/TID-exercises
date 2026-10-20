import { useState } from "react";

export default function NewTodoForm({ onAdd, list }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault(); // forget default and instead do customized behavior
    onAdd(text, list);
    setText(""); // clear up the input field
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New Task"
      />
      <button disabled={text.length === 0}>Add</button>
    </form>
  );
}
