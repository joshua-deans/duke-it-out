import React, {Component} from 'react';
import './Message.css';
import Moment from 'react-moment';
import moment from 'moment-timezone';
import Linkify from 'linkifyjs/react';

class Message extends Component {
    render() {
      if ((this.props.currentTeam == null && this.props.team === "team1") || this.props.team === this.props.currentTeam){
        return <div className="msgContainerStyle bg-light text-dark border border-dark my-2 mx-3 px-3 shadow-sm mr-auto" onSubmit={this.props.onSubmitEvent}>
            <h6 className="my-1 msgBodyStyle"><strong>{this.props.senderInfo.username}</strong></h6>
            <Linkify className="msgBodyStyle mb-1 text-wrap" tagName="p">{this.props.body}</Linkify>
            <p className="msgDateStyle mb-0 font-weight-light small text-capitalize" title={moment(this.props.date).local().toString()}><Moment interval={15000} fromNow>{this.props.date}</Moment></p>
        </div>
        } else {
        return (<div className="msgContainerStyle bg-light text-dark border border-dark my-2 mx-3 px-3 shadow-sm ml-auto">
          <h6 className="my-1 msgBodyStyle"><strong>{this.props.senderInfo.username}</strong></h6>
          <Linkify className="msgBodyStyle mb-1 text-wrap" tagName="p">{this.props.body}</Linkify>
          <p className="msgDateStyle mb-0 font-weight-light small text-capitalize" title={moment(this.props.date).local().toString()}><Moment interval={15000} fromNow>{this.props.date}</Moment></p>
        </div>)
      }
    }
}

export default Message;