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
    const buttonRoundStyle = {
      borderTopLeftRadius: "0",
      borderTopRightRadius: "0"
    };
    return (
      <div className="container-fluid" style={{overflowY: "hidden"}}>
        <div className= "d-flex flex-column p-4 h-100">
          { createNavBar }
          <br />
          <div className="d-flex flex-start align-content-between flex-row flex-wrap" id="chatList" style={{overflowY: "auto"}}>
            {this.state.chatRooms.map((room) => (
              <div className="card m-2 justify-content-between " id ={"chat-" + room.id}
              style={{minWidth: 250}}>
                <div className="card-header font-weight-bold rounded-top">
                  {room.name}
                </div>
                <div className="card-body pt-4">
                  {/*<h5 className="card-title">{room.name}</h5>*/}
                  <div className="mt-1 mb-3">
                    <h6 className="card-subtitle mb-2 text-muted">{room.team1}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">vs</h6>
                    <h6 className="card-subtitle text-muted">{room.team2}</h6>
                  </div>
                  <p className="mb-1 card-text">Starts: {moment(room.startTime).format("MMM D YYYY, h:mm A")}</p>
                  <p className="mb-1 card-text">Ends: {moment(room.endTime).format("MMM D YYYY, h:mm A")}</p>
                </div>
                <div className="card-footer p-0">
                <Link to={{pathname: "/room/" + room.id , state: {roomInfo: room}}} style={buttonRoundStyle}
                      id={"button-" + room.id} value={room.id} className="btn btn-success btn-block">Join Chat</Link>
                </div>
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