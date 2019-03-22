import React, {Component} from 'react';

class MessageInput extends Component {
  render() {
    const buttonStyle = {
      paddingBottom: '0px',
      paddingTop: '5px'
    };

    if (this.props.isLoggedIn && this.props.team != null) {
      return <form className="msgInputStyle input-group" onSubmit={this.props.onSubmitEvent}>
        <input className="form-control border-left-0 border-right-0 border-bottom-0 rounded-0" type="text" placeholder="Write a message"
               aria-label="Write a message" aria-describedby="send-msg-btn" style={{lineHeight: "20px", resize: "none"}}
               value={this.props.value} onChange={this.props.onChangeValue} required/>
        <div className="input-group-append">
          <button className="btn btn-primary rounded-0" type="submit" id="send-msg-btn" style={buttonStyle}>
            <i className="material-icons">send</i>
          </button>
        </div>
      </form>
    } else {
      let messageInputText;
      if (!this.props.isLoggedIn) {messageInputText = "You must be logged in to send a message!"}
      else {messageInputText = "Join a team to send a message!"}
      return <form className="msgInputStyle input-group border-0" onSubmit={this.props.onSubmitEvent}>
        <input className="form-control border-left-0 border-right-0 border-bottom-0 rounded-0" type="text" placeholder={messageInputText}
               aria-label="Write a message" aria-describedby="send-msg-btn" style={{lineHeight: "20px", resize: "none"}}
               value={this.props.value} onChange={this.props.onChangeValue} disabled />
        <div className="input-group-append">
          <button className="btn btn-primary rounded-0" type="submit" id="send-msg-btn" style={buttonStyle} disabled>
            <i className="material-icons">send</i>
          </button>
        </div>
      </form>
    }
  }
}

export default MessageInput;