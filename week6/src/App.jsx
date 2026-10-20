import "./App.css";
import ToDoList from "./components/ToDoList";
import "parse/dist/parse.min.js";
import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import ListPage from "./pages/ListPage";
import { Routes, Route } from "react-router-dom";

const Parse = window.Parse;

Parse.initialize(
  "vKRqzEebsVPCzmlevd81dev7BQTCIymzQsNSCdul",
  "w4X0r0lIjpiOr4JCb3PBBtP5C76LUJACnfxQ9Bpt",
);

Parse.serverURL = "https://parseapi.back4app.com";

function App() {
  const [user, setUser] = useState(Parse.User.current());

  function handleAuthenticated(loggedInUser) {
    setUser(loggedInUser);
  }
  function handleLogout() {
    Parse.User.logOut().then(() => setUser(null));
  }

  // conditional early return
  if (!user) {
    return <AuthPage onAuthenticated={handleAuthenticated} />;
  }
  return (
    <div className="main-inner">
      <Routes>
        <Route path="/" element={<ToDoList listTitle={"My todo lists"} />} />
        <Route path="/lists/:listId" element={<ListPage />} />
      </Routes>
      <button onClick={handleLogout}>Logout </button>
    </div>
  );
}

export default App;
