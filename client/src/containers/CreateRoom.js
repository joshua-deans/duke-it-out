import React, { Component } from 'react';

class CreateRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {'username': '', 'email': '', 'password': ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        let formStyle = {
            boxShadow: '5px 4px 5px #b3b3b3',
            padding: '20px 70px',
            width: '40vw', height: '40vh',
            minHeight: '200px', minWidth: '400px',
            overflowY: 'visible',
            position: 'absolute',
            left:'0', right:'0', top:'0', bottom:'0',
            margin:'auto'
        };

        return(
            <form className="card container-body" style={formStyle} >
                <h4 className="p-3">Make Your Room</h4>
                <div className="form-group">
                    <input type="text" className="form-control card-text" id="roomName" placeholder="Room Name" />
                </div>
                <button type="submit"className="btn btn-primary align-text-bottom mw-25 mx-auto">Start</button>
            </form>
        )
    }
}

export default CreateRoom;