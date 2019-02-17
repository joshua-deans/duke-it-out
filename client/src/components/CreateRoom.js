import React, { Component } from 'react';

class CreateRoom extends Component {
    render() {
        let createRoomFormStyle = {
            boxShadow: '5px 4px 5px #b3b3b3',
            width: '40vw',
            minHeight: '200px', minWidth: '400px'
        };
        console.log("createroom entered")

        return(
            <div className="container-body mx-auto">
            <form className="card container-body formStyle" style={createRoomFormStyle} >
                <h4 className="p-3">Make Your Room</h4>
                <div className="form-group">
                    <input type="text" className="form-control card-text" id="roomName" placeholder="Room Name" />
                </div>
                <div className="form-row form-group">
                    <div className="col">
                        <input type="text" className="form-control" id="team1" name="team1" placeholder="Team 1" />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" id="team2" name="team2" placeholder="Team 2" />
                    </div>
                </div>
                <div className="form-row form-group">
                    <div className="col">
                        <input type="text" className="form-control" id="startTime" name="startTime" placeholder="Start Time" />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" id="endTime" name="endTime" placeholder="End Time" />
                    </div>
                </div>
                <button type="submit"className="btn btn-primary align-text-bottom mw-25 mb-3 mx-auto">Start</button>
            </form>
            </div>
        )
    }
}

export default CreateRoom;