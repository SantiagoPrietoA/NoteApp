import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import Navigation from "./components/Navigation.jsx";
import CreateNote from "./components/CreateNote.jsx";
import CreateUser from "./components/CreateUser.jsx";
import NotesList from "./components/NotesList.jsx";

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <div className="container p-4">
          <Route path="/" exact component={NotesList} />
          <Route path="/edit/:id" exact component={CreateNote} />
          <Route path="/create" exact component={CreateNote} />
          <Route path="/user" exact component={CreateUser} />
        </div>
      </Router>
    </>
  );
}

export default App;
