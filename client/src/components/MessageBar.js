import React from 'react';
import { isAbsolute } from 'path';

const MessageBar = () => {

  const msgBarStyle = {
    width: '100%',
    height: '35px',
  }



  return (
      <input style={msgBarStyle} type="text" placeholder="write a message"/>
  )
}

export default MessageBar;