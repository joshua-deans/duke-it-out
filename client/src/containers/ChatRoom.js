import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import UserList from '../components/UserList';
import Header from '../components/Header';
import MessageInput from '../components/MessageInput';
import Message from "../components/Message";
import './ChatRoom.css';
import moment from 'moment-timezone';

let socket;

class ChatRoom extends Component {
	constructor(props){
		super(props);
		socket = io();
		socket.on('verified message', (msg, date, userInfo) => {
			this.setState({messageList: [...this.state.messageList, {body: msg, date: date, userInfo: userInfo}]});
		});
		this.state = {
			roomName: "Raptors vs Bulls",
			leftTeam: {
				title: "Raptors",
				members: ["John", "Andrew", "Bob"]},
			rightTeam: {
				title: "Bulls",
				members: ["Andy", "Kyle"]},
			currentMsg: '',
			messageList: []
		};
	}

  componentWillMount() {
	  fetch("http://localhost:5000/api/message")
      .then(res => {
        if (!res.ok){
          alert(res.status + "\n" + res.statusText);
          console.log(res);
          throw "Failed to sign up";
        }
        else {
          return res.json();
        }
    }).then(data => {
      var self = this;
      data.forEach(function(val){
        console.log(val);
        var currUserInfo = {
          id: val.creator_id,
          username: val.username,
          email: val.email};
        console.log(moment(val.timestamp));
        self.setState({messageList: [...self.state.messageList,
            {body: val.message, date: val.timestamp, userInfo: currUserInfo}]});
      })
    })

	}

  sendMessage = (event) => {
		event.preventDefault();
		if (this.props.isLoggedIn) {
      socket.emit('sent message', this.state.currentMsg, new moment().format(), this.props.userInfo);
      this.setState({currentMsg: ''});
    } else {
		  alert("You must be logged in to send a message!");
    }
	};

	handleChangeMessage = event => this.setState({currentMsg: event.target.value});

	componentWillUnmount() {
		socket.disconnect();
	}

	render () {
		let messages = this.state.messageList;
		return (
			<div className="container-body">
				<div className="d-flex justify-content-center h-100">
					<div className="userlist">
						{/* <Header title={this.state.leftTeam.title} header_type="list"/> */}
						<UserList team={this.state.leftTeam}/>
					</div>
					<div className="chatbox">
						<Header title={this.state.roomName} header_type="chat"/>
						<div id="msgBox" className="msgBoxStyle">
							{/*<Message body="This is a test" date={ new Date() } />*/}
							{this.state.messageList.map((message, index) => (
							<Message body={ message.body } date={ message.date } senderInfo={message.userInfo} />
							))}
						</div>
						<MessageInput value={this.state.currentMsg} onSubmitEvent={this.sendMessage}
                          onChangeValue={this.handleChangeMessage} isLoggedIn={this.props.isLoggedIn}/>
					</div>
					<div className="userlist">
						<UserList team={this.state.rightTeam}/>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    isLoggedIn: state.isloggedIn
  }
};

export default connect(mapStateToProps, null)(ChatRoom);