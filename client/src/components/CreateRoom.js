import React, { Component } from 'react';
import 'flatpickr/dist/themes/dark.css'
import Flatpickr from 'react-flatpickr'
import {connect} from "react-redux";
import { HOST_STRING } from '../helper/api-config';

class CreateRoom extends Component {
  constructor(props){
    super(props);
    this.state = {'roomName': '', 'team1': '', 'team2': '',
      'startTime': null, 'endTime': null};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.props.loginStatus || this.state.startTime == null || this.state.endTime == null){
      return;
    }
    let reqObj = this.state;
    reqObj.userId = this.props.userInfo.id;
    fetch(HOST_STRING + "/api/chat",
      {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(reqObj)})
      .then(function(res) {
        if (!res.ok){
          document.location.reload(true);
        }
        else {
          return res;
        }
      })
      .then(function(data) {
        console.log(data);
        window.location = "/";
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleChange(event) {
    this.state[event.target.name] = event.target.value;
  }

  handleDateChange(dates){
    if (dates != null && dates.length === 2) {
      this.setState({startTime: dates[0], endTime: dates[1]});
    }
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
            <input type="text" className="form-control card-text" id="roomName" name="roomName" placeholder="Room Name" onChange={this.handleChange} required/>
          </div>
          <div className="form-row form-group">
            <div className="col">
              <input type="text" className="form-control" id="team1" name="team1" placeholder="Team 1" onChange={this.handleChange} />
            </div>
            <div className="col">
              <input type="text" className="form-control" id="team2" name="team2" placeholder="Team 2" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <Flatpickr placeholder="Pick start and end time" className="form-control" options={
              {mode: "range", minDate: 'today', maxDate: new Date().fp_incr(7), enableTime: true, dateFormat: "m/d/Y H:i"}
            } onChange={this.handleDateChange} style={{'backgroundColor':'#fff'}} required/>
          </div>
          {this.props.loginStatus ?
            <button type="submit"
                    className="btn btn-primary align-text-bottom mw-25 mb-3 mx-auto" >Start</button>
            :
            <button type="submit"
                    className="btn btn-primary align-text-bottom mw-25 mb-3 mx-auto" disabled>Must log in</button>
          }
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loginStatus: state.isloggedIn,
    userInfo: state.userInfo
  }
};

export default connect(mapStateToProps, null)(CreateRoom);