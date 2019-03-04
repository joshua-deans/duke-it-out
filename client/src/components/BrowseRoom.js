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
        data.forEach(room => {
          console.log(room);
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
      <div className="container-body container-fluid my-3" style={{overflowY: "hidden"}}>
        <div className= "d-flex flex-column pt-3 h-100">
          { createNavBar }
          <br />
          <div className="d-flex flex-start align-content-between flex-row flex-wrap h-100" id="chatList" style={{overflowY: "auto"}}>
            {this.state.chatRooms.map((room) => (
              <div className="card m-2 flex-fill shadow-sm justify-content-between " key={room.id} id ={"chat-" + room.id}
              style={{minWidth: 220, maxWidth: "45%", height: "fit-content"}}>
                <div className="card-header font-weight-bold rounded-top" style={{margin: 1}}>
                  {room.name}
                </div>
                <div className="pt-3 pb-2">
                  <div className="mt-1 mb-2">
                    <h6 className="card-subtitle mb-2">{room.team1} <small>vs.</small> {room.team2}</h6>
                  </div>
                  <p className="mb-1 card-text small text-muted">Starts: {moment(room.start).local().format("MMM D YYYY, h:mm A")}</p>
                  <p className="mb-1 card-text small text-muted">Ends: {moment(room.end).local().format("MMM D YYYY, h:mm A")}</p>
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
  <ul className="nav nav-pills nav-fill px-4" id="browse-nav">
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