import "./App.css";
import ToDoList from "./ToDoList.jsx";

function App() {
  const toDoList1 = [
    { id: "1", text: "Call the landlord", done: false },
    { id: "2", text: "Book the dentist", done: false },
  ];

  const toDoList2 = [
    { id: "1", text: "Buy new tooth brush", done: false },
    { id: "2", text: "Clean kitchen", done: false },
  ];

  return (
    <>
      <ToDoList firstName={"Anna"} todos={toDoList1} />
      <ToDoList firstName={"Malene"} todos={toDoList2} />
    </>
  );
}

export default App;
