import React, { Component } from 'react';
import UserList from '../components/UserList';
import Header from '../components/Header';
import './ChatRoom.css';

class ChatRoom extends Component {

	state = {
		roomName: "Raptors vs Bulls",
		leftTeam: {
			title: "Raptors",
			members: ["John", "Andrew", "Bob"]}
			,
		rightTeam: {
			title: "Bulls",
			members: ["Andy", "Kyle"]}
	};

	render () {
		return (
			<div className="d-flex justify-content-center">
				<div className="userlist">
					{/* <Header title={this.state.leftTeam.title} header_type="list"/> */}
					<UserList team={this.state.leftTeam}/>
				</div>
				<div className="chatbox">
					<Header title={this.state.roomName} header_type="chat"/>
				</div>
				<div>
				</div>
				<div className="userlist">
					<UserList team={this.state.rightTeam}/>
				</div>
			</div>
			
		)
	}
}

export default ChatRoom;