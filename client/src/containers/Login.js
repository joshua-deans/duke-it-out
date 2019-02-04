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
        console.log(this.state);
    }

    handleChange(event) {
        this.state[event.target.name] = event.target.value;
    }

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
            <form className="card" style={formStyle} onSubmit={this.handleSubmit} >
                <h4 className="p-3">Log In</h4>
                <div className="form-group">
                    <input type="email" className="form-control" id="email" name="email"
                           placeholder="E-mail Address" onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control pb-2" id="password" name="password" placeholder="Password"
                           onChange={this.handleChange} minLength={6}/>
                </div>
                <button type="submit"className="btn btn-primary align-text-bottom mw-25 mx-auto">Submit</button>
            </form>
        )
    }
}

export default Login;