import React, { Component } from 'react';
import { Redirect } from 'react-router'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {'username': '', 'email': '', 'password': ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch("http://localhost:5000/api/user/create",
            {method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(this.state)})
            .then(function(res) {
                if (!res.ok){
                    document.location.reload(true);
                }
                else {
                    return res.json();
                }
            }).then(function(data) {
                console.log(data);
                window.location = "/";
            })
            .catch(function(error) {
            console.log(error);
        });
    }

    handleChange(event) {
        this.state[event.target.name] = event.target.value;
    }

    render() {
        let signupFormStyle = {
            width: '50vw'
        };

        return(
            <div className="container-body mx-auto">
            <form className="card formStyle shadow" style={signupFormStyle} onSubmit={this.handleSubmit} >
                <h4 className="p-3">Sign Up</h4>
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
                <button type="submit" className="btn btn-primary align-text-bottom mw-25 mb-3 mx-auto">Submit</button>
            </form>
            </div>
        )
    }
}

export default Signup;