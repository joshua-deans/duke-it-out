import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {'email': '', 'password': ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch("http://localhost:5000/api/user/login",
            {method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(this.state)})
            .then(function(res) {
                if (!res.ok){
                    document.location.reload(true);
                }
                else {
                    return res
                }
            }).then(function(data) {
                console.log(data);
                window.location = "/";
            }).catch(function(error) {
                console.log(error);
            });
    }

    handleChange(event) {
        this.state[event.target.name] = event.target.value;
    }

    render() {
        let loginFormStyle = {
            width: '50vw'
        };

        return(
            <div className="container-body mx-auto">
                <form className="card formStyle shadow" style={loginFormStyle} onSubmit={this.handleSubmit} >
                    <h4 className="p-3">Log In</h4>
                    <div className="form-group">
                        <input type="email" className="form-control" id="email" name="email"
                               placeholder="E-mail Address" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control pb-2" id="password" name="password" placeholder="Password"
                               onChange={this.handleChange} minLength={6}/>
                    </div>
                    <button type="submit"className="btn btn-primary align-text-bottom mw-25 mb-3 mx-auto">Submit</button>
                </form>
            </div>
        )
    }
}

export default Login;