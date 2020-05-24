import React, { Component } from 'react';
import axios from 'axios';

function Message(props){
    if (props.isLoggedIn) {
    }
    else {
        return (
            <p> You have successfully registered! 
                Please log-in to the system now </p>
        );
    }
}

export default class UserRegistration extends Component{

constructor(props){
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        name: '',
        email: '',
        password: '',
        isLoggedIn: false
    }
}

onChangeUsername(e) {
    this.setState({
        name: e.target.value
    });
}

onChangeEmail(e) {
    this.setState({
        email: e.target.value
    });
}

onChangePassword(e){
    this.setState({
        password: e.target.value
    });
}

onSubmit(e) {
    e.preventDefault();

    const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
    };

    axios.post('http://localhost:5000/api/users', user)
        .then(res => console.log(res.data));

    this.setState({
        name: '',
        email: '',
        password: '',
        isLoggedIn: true
    });
}

    render() {
        return (
            <div className="container">
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                <label>Name: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeUsername}
                />
                <label>Email: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    />
                <label>Password: </label>
                <input  type="password"
                    required
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    />
                </div>
                <div className="form-group">
                <input type="submit" value="Create User" className="btn btn-primary" />
                </div>

                {/* Gives capability for conditional rendering */}
                {
                    (this.state.isLoggedIn) ? (<Message />) : ""
                }
            </form>
            </div>
        )
    }
}