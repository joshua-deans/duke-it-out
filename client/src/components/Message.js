import React, {Component} from 'react';
import './Message.css';
import Moment from 'react-moment';

class Message extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return <div className="msgContainerStyle bg-light text-info border border-info m-3 px-3" onSubmit={this.props.onSubmitEvent}>
            <h6 className="my-1"><strong>Jim</strong></h6>
            <p className="msgBodyStyle mb-1 text-wrap">{this.props.body}</p>
            <p className="msgDateStyle mb-0 font-weight-light small text-capitalize" title={this.props.date.toLocaleString()}><Moment interval={15000} fromNow>{this.props.date}</Moment></p>
        </div>
    }
}

export default Message;