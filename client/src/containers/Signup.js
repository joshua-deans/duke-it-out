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
        fetch("http://localhost:5000/api/user",
            {method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state)})
            .then(function(res) {
                if (res.ok){
                    window.location = "/login";
                }
                else {
                    document.location.reload(true)
                }
            }).catch(function(error) {
            console.log(error);
        });
    }

    handleChange(event) {
        this.state[event.target.name] = event.target.value;
    }

    render() {
        let formStyle = {
            boxShadow: '5px 4px 5px #b3b3b3',
            padding: '20px 70px',
            width: '40vw', height: '67vh',
            minHeight: '200px', minWidth: '400px',
            overflowY: 'auto',
            position: 'absolute',
            left:'0', right:'0', top:'0', bottom:'0',
            margin:'auto'
        };

        return(
            <form className="card" style={formStyle} onSubmit={this.handleSubmit} >
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
                <button type="submit" className="btn btn-primary align-text-bottom mw-25 mx-auto">Submit</button>
            </form>
        )
    }
}

export default Signup;