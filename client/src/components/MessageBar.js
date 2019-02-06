import React from 'react';
import { isAbsolute } from 'path';

const MessageBar = () => {
  const msgBarStyle = {
    // height: '35px',
  };

  return (
      <div className="msgInputStyle input-group">
        <input className="form-control" style={msgBarStyle} type="text" placeholder="Write a message"
               aria-label="Write a message" aria-describedby="send-msg-btn"/>
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" id="send-msg-btn">Send</button>
        </div>
      </div>
  )
}

export default MessageBar;