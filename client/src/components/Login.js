import React, { Component } from 'react';
import { HOST_STRING } from '../helper/api-config';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {'email': '', 'password': ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

  showLoader(){
    document.querySelector("#loginSubmit").innerHTML = "" +
      "<span class=\"spinner-border spinner-border-sm mr-1\" role=\"status\" aria-hidden=\"true\"></span>Loading...";
  }

  hideLoader(){
    document.querySelector("#loginSubmit").innerHTML = "Submit";
  }

  handleSubmit(event) {
    event.preventDefault();
    let hideLoader = this.hideLoader;
    this.showLoader();
    fetch( HOST_STRING  + "/api/user/login",
      {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(this.state)})
      .then(function(res) {
        if (!res.ok){
          alert(res.status + "\n" + res.statusText);
          throw "Failed to log in";
        }
        else {
          return res
        }
      }).then(function(data) {
      window.location.reload(true);
    }).catch(function(error) {
      hideLoader();
      console.log(error);
    });
  }

    handleChange(event) {
        this.state[event.target.name] = event.target.value;
    }

    render() {
        let loginFormStyle = {
            // width: '50vw',
            // maxWidth: '550px',
            // minWidth: '350px'
        };

        return(
          <form style={loginFormStyle} onSubmit={this.handleSubmit} >
            <div className="modal-body">
                <div className="form-group">
                  <input type="email" className="form-control" id="email" name="email"
                         placeholder="E-mail Address" onChange={this.handleChange} required/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control pb-2" id="password" name="password" placeholder="Password"
                         onChange={this.handleChange} minLength={6} required/>
                </div>
            </div>
            <div className="modal-footer">
              <button type="submit" id="loginSubmit" className="btn btn-primary align-text-bottom">Submit</button>
            </div>
          </form>
        )
    }
}

export default Login;