import React, { useState } from 'react';
import TaskList from './components/TaskList';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserRegistration from "./components/userRegistration.component";
import UserLogin from "./components/userLogin.component";
import 'typeface-roboto';

function App() {

  // Ideally would use hooks to set the name within the log-in feature
  const [name, setName] = React.useState('');
  const [logged, setLogged] = useState(false);

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