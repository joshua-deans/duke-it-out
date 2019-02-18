import React, { Component } from 'react';
import 'flatpickr/dist/themes/dark.css'
import Flatpickr from 'react-flatpickr'

class CreateRoom extends Component {
  constructor(props){
    super(props);
    this.state = {'roomName': '', 'team1': '', 'team2': '',
      'startTime': '', 'endTime': ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  handleChange(event) {
    this.state[event.target.name] = event.target.value;
  }

  handleDateChange(dates){
    this.setState({startTime: dates[0], endTime: dates[1]});
    console.log(this.state);
  }

  render() {
    let createRoomFormStyle = {
      boxShadow: '5px 4px 5px #b3b3b3',
      width: '40vw',
      minHeight: '200px', minWidth: '400px'
    };
    return(
      <div className="container-body mx-auto">
        <form className="card container-body formStyle" style={createRoomFormStyle}  onSubmit={this.handleSubmit}  >
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
          <div className="form-group">
            <Flatpickr placeholder="Pick start and end time" className="form-control" options={
              {mode: "range", minDate: 'today', maxDate: new Date().fp_incr(7), enableTime: true, dateFormat: "m/d/Y H:i"}
            } onChange={this.handleDateChange} style={{'backgroundColor':'#fff'}}/>
          </div>
          <button type="submit"className="btn btn-primary align-text-bottom mw-25 mb-3 mx-auto">Start</button>
        </form>
      </div>
    )
  }
}

export default CreateRoom;