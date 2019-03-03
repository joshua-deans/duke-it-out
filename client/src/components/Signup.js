import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { HOST_STRING } from '../helper/api-config';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {'username': '', 'email': '', 'password': ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(HOST_STRING + "/api/user/create",
            {method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(this.state)})
            .then(function(res) {
                if (!res.ok){
                  alert(res.status + "\n" + res.statusText);
                  throw "Failed to sign up";
                }
                else {
                    return res;
                }
            }).then(function(data) {
                window.location.reload(true);
            })
            .catch(function(error) {
                console.log(error);
        });
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
                       onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <input type="email" className="form-control" id="email" name="email" placeholder="E-mail Address"
                       onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <input type="password" className="form-control" id="password" name="password" placeholder="Password"
                       onChange={this.handleChange} minLength={6}/>
              </div>
              {/*<div className="form-group">*/}
              {/*<input type="password" className="form-control" id="passwordConfirm" name="passwordConfirm" placeholder="Confirm Password"*/}
              {/*onChange={this.handleChange}/>*/}
              {/*</div>*/}
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary align-text-bottom">Submit</button>
              </div>
            </form>
        )
    }
}

export default Signup;