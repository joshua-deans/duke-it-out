import React, { Component } from 'react';

class Login extends Component {
    render() {
        let loginFormStyle = {
            width: '50vw',
            height: '50vh'
        };

        return(
            <div className="container-body mx-auto">
            <form className="card formStyle shadow" style={loginFormStyle} >
                <h4 className="p-3">Log In</h4>
                <div className="form-group">
                    <input type="text" className="form-control" id="email" name="username"
                           placeholder="E-mail Address"/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control pb-2" id="password" name="password" placeholder="Password" />
                </div>
                <button type="submit"className="btn btn-primary align-text-bottom mw-25 mx-auto">Start</button>
            </form>
            </div>
        )
    }
}

export default Login;