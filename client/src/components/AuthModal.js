import React, {Component} from 'react';
import Signup from "./Signup";
import Login from "./Login";

class AuthModal extends Component {
  constructor(props){
    super(props);
    this.state = {formType: "login"};
    this.changeFormType = this.changeFormType.bind(this);
  }

  changeFormType(event){
    let value = event.target.value;
    let loginLink = document.querySelector("#loginLink");
    let signupLink = document.querySelector("#signupLink");
    this.setState({formType: value});
    if (value === "login"){
      loginLink.classList.add("active");
      signupLink.classList.remove("active");
    } else if (value === "signup"){
      loginLink.classList.remove("active");
      signupLink.classList.add("active");
    }
  }

  render() {
    return (
      <div className="modal fade" id="authModal" tabIndex="-1" role="dialog" aria-labelledby="authModalLabel"
           aria-hidden="true">
        <div className="modal-dialog" role="document" style={{top: "20%"}}>
          <div className="modal-content">
            <div className="modal-header">
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <button className="btn btn-link nav-link active" value="login" id="loginLink" onClick={this.changeFormType}>Login</button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" value="signup" id="signupLink" onClick={this.changeFormType}>Signup</button>
                </li>
              </ul>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {this.state.formType === "login" ?
              <Login/> :
              <Signup/>
            }
          </div>
        </div>
      </div>)
  }
}

export default AuthModal;