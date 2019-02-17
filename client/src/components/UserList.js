import React from 'react';
import Header from './Header';

export const User = (props) => {
  return (
		<li class="list-group-item">{props.username}</li>
	)
}

const UserList = (props) => {
	return (
		<div>
			<Header title={props.team.title} header_type="list"/>
			<ul class="list-group">
				{props.team.members.map(username => 
					<User username={username}/>
				)}
			</ul>
		</div>

	)
}

export default UserList;