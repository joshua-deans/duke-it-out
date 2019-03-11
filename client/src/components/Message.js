import React, {Component} from 'react';
import './Message.css';
import Moment from 'react-moment';
import moment from 'moment-timezone';
import Linkify from 'linkifyjs/react';

class Message extends Component {
    render() {
        return <div className="msgContainerStyle bg-light text-dark border border-dark my-2 mx-3 px-3 shadow-sm" onSubmit={this.props.onSubmitEvent}>
            <h6 className="my-1 msgBodyStyle"><strong>{this.props.senderInfo.username}</strong></h6>
            <Linkify className="msgBodyStyle mb-1 text-wrap" tagName="p">{this.props.body}</Linkify>
            <p className="msgDateStyle mb-0 font-weight-light small text-capitalize" title={moment(this.props.date).local().toString()}><Moment interval={15000} fromNow>{this.props.date}</Moment></p>
        </div>
    }
}

export default Message;