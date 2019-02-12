import React, {Component} from 'react';
import Message from "../containers/ChatRoom";

class MessageBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div id="msgBox" className="msgBoxStyle">
            <Message content="test" />
            {this.props.messages}
        </div>
        )
    }
}

export default MessageBox;