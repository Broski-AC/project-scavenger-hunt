import React, { useState } from 'react';
import TaskList from './components/TaskList';
import './App.css';

function App() {

  // Ideally would use hooks to set the name within the log-in feature
  const [name, setName] = React.useState('');
  const [logged, setLogged] = useState(false);

  return (
    <div className="container">
        Scavenger
        <br/>
        <TaskList/>
    </div>
  );
}

export default App;
