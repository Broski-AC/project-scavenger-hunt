import React, { Component } from 'react';
import axios from 'axios';

export default class UserLogin extends Component{

    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            email: '',
            password: '',
        }
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
    
        const userLogin = {
            email: this.state.email,
            password: this.state.password
        };

        axios.post('http://localhost:5000/api/auth/login', userLogin)
            .then(res => console.log(res))
            .catch(error => window.alert("Unrecognized or unauthorized user. Please try again"))
    }
    
        render() {
            return (
                <div className="container">
                <h3>Log-In User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                    <label> Email </label>
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
                    <input type="submit" value="Log-In" className="btn btn-primary" />
                    </div>
                </form>
                </div>
            )
        }
    }