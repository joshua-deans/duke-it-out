import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { HOST_STRING } from '../helper/api-config';

class BrowseRoom extends Component {
  constructor(props){
    super(props);
    this.state = {chatRooms: []};
  }

  componentWillMount(){
    const setRoomState = (room) => {
      this.setState({chatRooms: [...this.state.chatRooms, room]});
    };
    fetch(HOST_STRING + "/api/chat", {mode: 'cors'})
      .then(res => {
        if (!res.ok){
          throw "Getting chat rooms failed";
        }
        return res.json();
      })
      .then(function(data) {
        console.log(data);
        data.forEach(room => {
          setRoomState(room);
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container-body container-fluid">
        <div className="p-4">
          { createNavBar }
          <br />
          <div className="d-flex flex-start align-content-between flex-row flex-wrap" id="chatList">
            {this.state.chatRooms.map((room) => (
              <div className="card p-3 m-2" id ={"chat-" + room.id}
              style={{minWidth: 250}}>
                <h5>{room.name}</h5>
                <p className="mb-1">{room.team1} vs. {room.team2}</p>
                <p className="mb-1">Starts: {moment(room.startTime).format("MMM D YYYY, h:mm A")}</p>
                <p>Ends: {moment(room.endTime).format("MMM D YYYY, h:mm A")}</p>
                <Link to={{pathname: "/room/" + room.id , state: {roomInfo: room}}}
                      id={"button-" + room.id} value={room.id} className="btn btn-success btn-sm right">Join Chat</Link>
              </div>
              ))}
          </div>
          </div>
        </div>
    );
  }
}

const createNavBar = (
  <ul className="nav nav-pills nav-fill" id="browse-nav">
    <li className="nav-item">
      <a className="nav-link active" href="#">All</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#">Basketball</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#">Soccer</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#">Football</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#">E-Sports</a>
    </li>
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
         aria-expanded="false">Other</a>
      <div className="dropdown-menu">
        <a className="dropdown-item" href="#">Baseball</a>
        <a className="dropdown-item" href="#">Boxing</a>
        <a className="dropdown-item" href="#">Hockey</a>
        <a className="dropdown-item" href="#">UFC</a>
      </div>
    </li>
  </ul>
);

export default BrowseRoom;