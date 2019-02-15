import React, {Component} from 'react';
import { isAbsolute } from 'path';

class MessageInput extends Component {
  constructor(props){
      super(props);
  }

  render() {
      return <form className="msgInputStyle input-group" onSubmit={this.props.onSubmitEvent}>
        <input className="form-control" type="text" placeholder="Write a message"
               aria-label="Write a message" aria-describedby="send-msg-btn"
               value={this.props.value} onChange={this.props.onChangeValue} required/>
        <div className="input-group-append">
          <button className="btn btn-primary" type="submit" id="send-msg-btn">Send</button>
        </div>
      </form>
  }
}

export default MessageInput;