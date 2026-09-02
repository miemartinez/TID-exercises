export default function ToDoList({ firstName, todos }) {
  let h1style = { color: "deeppink" };

  function handleAdd(event) {
    console.log("We should add a new item");
  }

  return (
    <>
      <h1 style={h1style}>To Do List for {firstName} </h1>
      <ul>
        {todos.map((elem, index) => (
          <li key={index}>{elem}</li>
        ))}
      </ul>
      <button onClick={handleAdd}>Add New Task</button>
    </>
  );
}
