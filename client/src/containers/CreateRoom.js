import React, { Component } from 'react';

class CreateRoom extends Component {
  render() {

		let formStyle = {
			border: '1px solid #e6e6e6',
			boxShadow: '5px 4px #b3b3b3',
			padding: '20px 70px 20px 70px',
			width: '40vh',
			marginTop: '30vh'
		}

    return(
			<div> 
				<div className="d-flex justify-content-center">
					<form style={formStyle} >
						<div class="form-group">
							<h4>Make Your Room</h4>
							<input type="text" class="form-control" id="roomName" placeholder="Room Name" />
						</div>
						<button type="submit">Start</button>
					</form>
				</div>
			</div>

    )
  }
}

export default CreateRoom;