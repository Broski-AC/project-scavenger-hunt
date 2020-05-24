import React from 'react';
import TaskList from './components/TaskList';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserRegistration from "./components/userRegistration.component";
import UserLogin from "./components/userLogin.component";

function App() {
  return (
    <Router>
      <div className="container">
          <Navbar />
          <Route path="/api/users" component={UserRegistration} />
          <Route path="/QuestEntry" component={TaskList} />
          <Route path="/api/auth/login" component={UserLogin} />
         
          {/* <TaskList/> */}
      </div>
    </Router>
  );
}

export default App;
