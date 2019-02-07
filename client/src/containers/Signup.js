import React, { Component } from 'react';

class Signup extends Component {
    render() {
        let signupFormStyle = {
            width: '50vw',
            height: '67vh'
        };

        return(
            <div className="container-body mx-auto">
            <form className="card formStyle shadow" style={signupFormStyle} >
                <h4 className="p-3">Sign Up</h4>
                <div className="form-group">
                    <input type="text" className="form-control" id="username" name="username" placeholder="Username"/>
                </div>
                <div className="form-group">
                    <input type="text" class="form-control" id="email" name="username" placeholder="E-mail Address" />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="password" name="password" placeholder="Password" />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="passwordConfirm" name="passwordConfirm" placeholder="Confirm Password" />
                </div>
                <button type="submit" class="btn btn-primary align-text-bottom mw-25 mx-auto">Start</button>
            </form>
            </div>
        )
    }
}

export default Signup;