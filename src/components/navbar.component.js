import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Scavengar</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/api/users" className="nav-link">Register User</Link>
          </li>
          <li className="navbar-item">
          <Link to="/QuestEntry" className="nav-link">Task List</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}