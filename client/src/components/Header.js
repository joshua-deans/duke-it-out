import React from 'react';

const header = (props) => {

	//styles based on header type
	const header = {
		borderWidth: '0 0 1px 0',
    borderStyle: 'solid',
    borderColor: '#d9d9d9',
		padding: '5px 0 5px 0',
		textAlign: 'center',
		color: 'white',
		margin: '0 0 0 0'
	}

	const listHeader = {
		...header,
		backgroundColor: '#9E1946',
	}

	const chatHeader = {
		...header,
    backgroundColor: '#710627',
	}

	let headerStyle = null;

	if (props.header_type === "chat") {
		headerStyle = chatHeader;
	} else {
		headerStyle = listHeader;
	}

	return (
		<h5 style={headerStyle}>{props.title}</h5>
	)
}

export default header;