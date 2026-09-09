export default function ToDoPanel({ firstName, children }) {
  let h1style = { color: "deeppink" };

  return (
    <>
      <h1 style={h1style}>To Do List for {firstName}</h1>
      <div style={{ backgroundColor: "palegreen" }}>{children}</div>
    </>
  );
}
