import React, { Component } from 'react';

class Login extends Component {
    render() {
        let formStyle = {
            boxShadow: '5px 4px 5px #b3b3b3',
            padding: '20px 70px',
            width: '40vw', height: '50vh',
            minHeight: '200px', minWidth: '400px',
            overflowY: 'auto',
            position: 'absolute',
            left:'0', right:'0', top:'0', bottom:'0',
            margin:'auto'
        };

        return(
            <form className="card container-body" style={formStyle} >
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
        )
    }
}

export default Login;