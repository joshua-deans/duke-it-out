import React, { Component } from 'react';
import UserList from '../components/UserList';

class ChatRoom extends Component {

	state = {
		leftTeamUsers: ["John", "Andrew", "Bob"],
		rightTeamUsers: ["Andy", "Kyle"]
	};

	render () {
		return (
			<div className="d-flex justify-content-center">
				<UserList userList={this.state.leftTeamUsers}/>
				<UserList userList={this.state.rightTeamUsers}/>
			</div>
			
		)
	}
}

export default ChatRoom;