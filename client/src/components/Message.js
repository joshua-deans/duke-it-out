import React, {Component} from 'react';

class Message extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return <div className="msgInputStyle input-group bg-success w-50 m-3 p-3" onSubmit={this.props.onSubmitEvent}>
            <p>{this.props.content}</p>
        </div>
    }
}

export default Message;