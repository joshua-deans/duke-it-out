import React from 'react';
import Header from './Header';

export const User = (props) => {
  return (
		<li className="list-group-item">{props.username}</li>
	)
};

const UserList = (props) => {
  const listStyle = {
    paddingLeft: '1px',
    paddingRight: '1px'
  };
	return (
		<div>
			<Header title={props.team.title} header_type="list"/>
			<ul className="list-group list-group-flush" style={listStyle}>
				{props.team.members.map((username, key) =>
					<User username={username} key={key}/>
				)}
			</ul>
		</div>

	)
};

export default UserList;