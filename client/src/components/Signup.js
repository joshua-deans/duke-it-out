import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { HOST_STRING } from '../helper/api-config';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {'username': '', 'email': '', 'password': '', 'confirmPassword' : ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    showLoader(){
      document.querySelector("#signupSubmit").innerHTML = "" +
        "<span className=\"spinner-border spinner-border-sm mr-1\" role=\"status\" aria-hidden=\"true\"/>Loading...";
    }

    hideLoader(){
      document.querySelector("#signupSubmit").innerHTML = "Submit";
    }

    handleSubmit(event) {
        event.preventDefault();
        let hideLoader = this.hideLoader;
        if (this.state.password !== this.state.confirmPassword){
          alert("Passwords don't match!");
        } else {
          this.showLoader();
          fetch(HOST_STRING + "/api/user/create",
            {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              credentials: 'include',
              body: JSON.stringify(this.state)
            })
            .then(function (res) {
              if (!res.ok) {
                alert(res.status + "\n" + res.statusText);
                throw "Failed to sign up";
              } else {
                return res;
              }
            }).then(function (data) {
              window.location.reload(true);
          })
            .catch(function (error) {
              hideLoader();
              console.log(error);
            });
        }
    }

    handleChange(event) {
        this.state[event.target.name] = event.target.value;
    }

    render() {
      return(
            <form onSubmit={this.handleSubmit} >
              <div className="modal-body">
              <div className="form-group">
                <input type="text" className="form-control" id="username" name="username" placeholder="Username"
                       onChange={this.handleChange} required/>
              </div>
              <div className="form-group">
                <input type="email" className="form-control" id="email" name="email" placeholder="E-mail Address"
                       onChange={this.handleChange} required/>
              </div>
              <div className="form-group">
                <input type="password" className="form-control" id="password" name="password" placeholder="Password"
                       onChange={this.handleChange} minLength={6} required/>
              </div>
              <div className="form-group">
                <input type="password" className="form-control pb-2" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password"
                       onChange={this.handleChange} minLength={6} required/>
              </div>
              </div>
              <div className="modal-footer">
                <button type="submit" id="signupSubmit" className="btn btn-primary align-text-bottom">Submit</button>
              </div>
            </form>
        )
    }
}

export default Signup;