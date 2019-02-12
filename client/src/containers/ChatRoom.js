import React, { Component } from 'react';
import UserList from '../components/UserList';
import Header from '../components/Header';
import './ChatRoom.css';
import MessageInput from '../components/MessageInput';
import io from 'socket.io-client';
import Message from "../components/Message";
var socket;

class ChatRoom extends Component {
	constructor(props){
		super(props);
		socket = io();
		socket.on('verified message', (msg, date) => {
			this.setState({messageList: [...this.state.messageList, {body: msg, date: date}]});
		});
		this.state = {
			roomName: "Raptors vs Bulls",
			leftTeam: {
				title: "Raptors",
				members: ["John", "Andrew", "Bob"]},
			rightTeam: {
				title: "Bulls",
				members: ["Andy", "Kyle"]},
			message: '',
			messageList: []
		};
	}

	sendMessage = (event) => {
		event.preventDefault();
		socket.emit('sent message', this.state.message, new Date(Date.now()));
		this.setState({message: ''});
	};

	handleChangeMessage = event => this.setState({message: event.target.value});

	componentWillUnmount() {
		socket.disconnect();
	}

	render () {
		var messages = this.state.messageList;
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
							<Message body="This is a test" date={ new Date() } />
							{this.state.messageList.map((message, index) => (
							<Message body={ message.body } date={ message.date } />
							))}
						</div>
						<MessageInput value={this.state.message} onSubmitEvent={this.sendMessage} onChangeValue={this.handleChangeMessage}/>
					</div>
					<div className="userlist">
						<UserList team={this.state.rightTeam}/>
					</div>
				</div>
			</div>
		)
	}
}

export default ChatRoom;