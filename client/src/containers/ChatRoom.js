import React, { Component } from 'react';
import UserList from '../components/UserList';
import Header from '../components/Header';
import './ChatRoom.css';
import MessageBar from '../components/MessageBar';

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

		const msgBoxStyle = {
			marginTop: '84vh',
			borderWidth: '1px 0 0 0',
			borderStyle: 'solid',
			padding: '20px 10px 0 10px',
			borderColor: '#d9d9d9'
		  }

		return (
			<div className="d-flex justify-content-center">
				<div className="userlist">
					{/* <Header title={this.state.leftTeam.title} header_type="list"/> */}
					<UserList team={this.state.leftTeam}/>
				</div>
				<div className="chatbox">
					<Header title={this.state.roomName} header_type="chat"/>
					<div style={msgBoxStyle}>
						<MessageBar/>
					</div>
				</div>
				<div className="userlist">
					<UserList team={this.state.rightTeam}/>
				</div>
			</div>
			
		)
	}
}

export default ChatRoom;