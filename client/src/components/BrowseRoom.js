import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { HOST_STRING } from '../helper/api-config';

class BrowseRoom extends Component {
  constructor(props){
    super(props);
    this.state = {searchString: '', chatRooms: []};
    this.onSearchChange = this.onSearchChange.bind(this);
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
          setRoomState(room);
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  onSearchChange(event){
    this.setState({searchString: event.target.value});
  }

  filterRoomsBySearch = (chatRooms) => {
      return chatRooms.filter(chatRoom => {
        return chatRoom.name.toLowerCase().includes(this.state.searchString.toLowerCase()) ||
          chatRoom.team1.toLowerCase().includes(this.state.searchString.toLowerCase()) ||
          chatRoom.team2.toLowerCase().includes(this.state.searchString.toLowerCase())
      });
    };

  render() {
    const buttonRoundStyle = {
      borderTopLeftRadius: "0",
      borderTopRightRadius: "0"
    };
    let chatRooms = this.state.chatRooms;
    if (this.state.searchString !== ''){
      chatRooms = this.filterRoomsBySearch(chatRooms);
    }
    return (
      <div className="container-body" style={{overflowY: "hidden"}}>
        <div className= "d-flex flex-column h-100">
          { this.createNavBar() }
          <div className="d-flex flex-start align-content-between flex-row flex-wrap p-3 h-100" id="chatList" style={{overflowY: "auto"}}>
            {chatRooms.map((room) => (
              <div className="card m-2 flex-fill shadow-sm justify-content-between " key={room.id} id ={"chat-" + room.id}
              style={{minWidth: 220, maxWidth: 300, height: "fit-content"}}>
                <div className="card-header font-weight-bold rounded-top" style={{margin: 1}}>
                  {room.name}
                </div>
                <div className="pt-3 pb-2 px-2">
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

  createNavBar = () => {
    return (
    <div className="d-flex jumbotron justify-content-between align-items-center mb-0 flex-shrink-0 flex-row-reverse py-2 px-3">
      <div className="dropdown mx-2 my-2">
        <button className="btn btn-outline-secondary dropdown-toggle float-right" data-display="static" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
          Filter
        </button>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
          <button className="dropdown-item" type="button">None</button>
          <button className="dropdown-item" type="button">Basketball</button>
          <button className="dropdown-item" type="button">Soccer</button>
          <button className="dropdown-item" type="button">Football</button>
          <button className="dropdown-item" type="button">E-Sports</button>
          <button className="dropdown-item" type="button">Baseball</button>
          <button className="dropdown-item" type="button">Boxing</button>
          <button className="dropdown-item" type="button">Hockey</button>
          <button className="dropdown-item" type="button">UFC</button>
        </div>
      </div>
      <form onSubmit={event => event.preventDefault()} className="form-inline mx-2 my-2 my-lg-0" style={{flexWrap: "nowrap"}}>
        <input className="form-control mr-sm-2" id="search" name="search" type="search" placeholder="Search" aria-label="Search"
               onChange={this.onSearchChange}/>
      </form>
    </div>)};
}

export default BrowseRoom;