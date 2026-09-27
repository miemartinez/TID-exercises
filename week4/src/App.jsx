import "./App.css";
import ToDoList from "./ToDoList.jsx";
import "parse/dist/parse.min.js";
const Parse = window.Parse;

Parse.initialize(
  "vKRqzEebsVPCzmlevd81dev7BQTCIymzQsNSCdul",
  "w4X0r0lIjpiOr4JCb3PBBtP5C76LUJACnfxQ9Bpt",
);

Parse.serverURL = "https://parseapi.back4app.com";

function App() {
  return (
    <>
      <ToDoList firstName={"Anna"} />
    </>
  );
}

export default App;
