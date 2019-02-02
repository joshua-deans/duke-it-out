import React, { Component } from 'react';

class CreateRoom extends Component {
    render() {

        let formStyle = {
            border: '1px solid #e6e6e6',
            boxShadow: '5px 4px #b3b3b3',
            padding: '20px 70px 20px 70px',
            width: '40vw',
            height: '40vh',
            marginTop: '20vh'
        };

        return(
            <div className="d-flex justify-content-center">
                <form style={formStyle} >
                    <div class="form-group">
                        <h4>Make Your Room</h4>
                        <input type="text" class="form-control card-text" id="roomName" placeholder="Room Name" />
                    </div>
                    <button type="submit"class="btn btn-primary">Start</button>
                </form>
            </div>
        )
    }
}

export default CreateRoom;