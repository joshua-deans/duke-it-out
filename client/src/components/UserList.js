import React from 'react';

export const User = (props) => {
  return (
		<li class="list-group-item">{props.username}</li>
	)
}

const UserList = (props) => {
	console.log(props);
	return (
		<ul class="list-group">
			{props.userList.map(username => 
				<User username={username}/>
			)}
		</ul>
	)
}

export default UserList;