import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'typeface-roboto';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default class Navbar extends Component {

  render() {

    return (

      <Grid
        container direction="row"
        justify="space-around"
        alignItems="center"
      >
      <AppBar position = "static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        <Grid item>
        <Typography variant="h6" color="textSecondary" > 
          <Link to="/" style={{color: "white"}}>Scavenger Scouts</Link>
        </Typography>
        </Grid>
        <Grid item>
        <Typography variant="h6" color="initial">
          <Link to="/api/users" style={{color: "white"}}>Register User</Link>
        </Typography>
        </Grid>
        <Typography variant="h6" color="initial">
          <Link to="/api/auth/login" style={{color: "white"}}>LogIn</Link>
        </Typography>
        <Typography variant="h6" color="initial">
          <Link to="/QuestEntry" style={{color: "white"}}>Task List</Link>
        </Typography>
        </Toolbar>
      </AppBar>
      </Grid>

      // <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      //   <Link to="/" className="navbar-brand">Scavengar</Link>
      //   <div className="collpase navbar-collapse">
      //   <ul className="navbar-nav mr-auto">
      //     <li className="navbar-item">
      //     <Link to="/api/users" className="nav-link">Register User</Link>
      //     </li>
      //     <li className="navbar-item">
      //     <Link to="/QuestEntry" className="nav-link">Task List</Link>
      //     </li>
      //     <li className="navbar-item">
      //     <Link to="/api/auth/login" className="nav-link">Log In</Link>
      //     </li>
      //   </ul>
      //   </div>
      // </nav>
    );
  }
}