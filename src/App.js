import React from 'react';
import TaskList from './components/TaskList';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserRegistration from "./components/userRegistration.component";

function App() {
  return (
    <Router>
      <div className="container">
          Scavenger
          <Navbar />
          <Route path="/api/users" component={UserRegistration} />
          <Route path="/QuestEntry" component={TaskList} />
         
          {/* <TaskList/> */}
      </div>
    </Router>
  );
}

export default App;
