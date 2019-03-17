import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import UserList from '../components/UserList';
import Header from '../components/Header';
import MessageInput from '../components/MessageInput';
import Message from "../components/Message";
import Button from "../components/Button";

import './ChatRoom.css';
import moment from 'moment-timezone';
import { HOST_STRING } from '../helper/api-config';

let socket;
let roomInfo;

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    if (!this.props.location.state){
      this.state = {
        roomName: "",
        leftTeam: {title: "", members: []},
        rightTeam: {title: "", members: []},
        currentMsg: '',
        currentTeam: null,
        loaded: false,
        messageList: []
      };
      this.getRoomInfo();
    } else {
      roomInfo = this.props.location.state.roomInfo;
      this.getPreviousMessages(roomInfo.id);
      socket = io();
      this.setupSockets(roomInfo);
      this.state = {
        roomName: roomInfo.name,
        leftTeam: {title: roomInfo.team1, members: []},
        rightTeam: {title: roomInfo.team2, members: []},
        currentMsg: '',
        loaded: true,
        currentTeam: null,
        messageList: []
      };
    }
  }

  getRoomInfo(){
    fetch(HOST_STRING + "/api/chat/" + this.props.match.params.roomId)
      .then(res => {
        if (!res.ok){
          window.history.back();
        }
        else {
          return res.json();
        }
      }).then(data => {
      this.state.leftTeam.title = data[0].team1;
      this.state.rightTeam.title = data[0].team2;
      this.setState({roomName: data[0].name, loaded: true});
      this.getPreviousMessages(data[0].id);
      socket = io();
      this.setupSockets(data[0]);
    }).catch(error => {
      console.log(error);
    });
  }

  setupSockets(roomInfo) {
    socket.on('connect', () => {
      socket.emit('clientInfo', this.props.userInfo, roomInfo);
    });
    socket.on('verified message', (msg, date, userInfo, team) => {
      this.setState({messageList: [...this.state.messageList, {body: msg, date: date, userInfo: userInfo, team: team}]});
    });
    socket.on('joinTeamSelfSuccess', (userInfo, teamName) => {
      this.setState({currentTeam: teamName});
    });
    socket.on('joinTeamOther', (userInfo, teamName) => {
      let currState;
      if (teamName === "team1") {
        currState = this.state.leftTeam;
        currState.members.push(userInfo);
        this.setState({leftTeam: currState});
      } else {
        currState = this.state.rightTeam;
        currState.members.push(userInfo);
        this.setState({rightTeam: currState});
      }
    });
    socket.on('leaveTeamSelfSuccess', () => {
      this.setState({currentTeam: null});
    });
    socket.on('leaveOtherTeam', () => {
      console.log("TODO");
    });
  }

  getPreviousMessages(roomId) {
	  fetch(HOST_STRING + "/api/message/room/" + roomId)
      .then(res => {
        if (!res.ok){
          alert(res.status + "\n" + res.statusText);
          throw "Failed to sign up";
        }
        else {
          return res.json();
        }
    }).then(data => {
      let self = this;
      data.forEach(val => {
        let currUserInfo = {id: val.creator_id, username: val.username, email: val.email};
        self.setState({messageList: [...self.state.messageList,
            {body: val.message, date: val.timestamp, userInfo: currUserInfo, team: val.team}]});
      })
    })
	}

  sendMessage = (event) => {
		event.preventDefault();
		if (this.props.isLoggedIn && this.state.currentTeam != null) {
      socket.emit('sent message', this.state.currentMsg, new moment().format(), this.props.userInfo, roomInfo.id, this.state.currentTeam);
      this.setState({currentMsg: ''});
    } else {
		  alert("You must be logged in to send a message!");
    }
	};

  handleChangeMessage = event => this.setState({currentMsg: event.target.value});
  
  onSelectTeam = (name) => {
    socket.emit('joinTeamSelf', this.props.userInfo, roomInfo, name)
  };
	
	componentWillUnmount() {
		socket.disconnect();
	}

	render () {
    const reverse = this.state.currentTeam === "team2" ? ' flex-row-reverse' : '';
    if (!this.state.loaded) {
      return (<div className="d-flex flex-column align-middle flex-grow-1 justify-content-center">
        <div>
        <span style={{width: "2rem", height: "2rem"}} class="spinner-border spinner-border-sm mr-3" role="status" aria-hidden="true"></span>
        <span style={{fontSize: "2rem"}}>Loading...</span>
        </div>
      </div>);
    } else
		return (
			<div className="container-body">
				<div className={"d-flex  justify-content-center h-100" + reverse} style={{minHeight: "500px"}}>
					<div className="userlist">
						<UserList team={this.state.leftTeam}/>
            {this.returnSideButton("team1")}
					</div>
					<div className="chatbox">
						<Header title={this.state.roomName} header_type="chat"/>
						<div id="msgBox" className="msgBoxStyle">
							{this.state.messageList.slice(0).reverse().map((message, index) => (
							<Message body={ message.body } date={ message.date } senderInfo={message.userInfo} team={message.team}
                       currentTeam={this.state.currentTeam}/>
							))}
						</div>
						<MessageInput value={this.state.currentMsg} onSubmitEvent={this.sendMessage}
              onChangeValue={this.handleChangeMessage} isLoggedIn={this.props.isLoggedIn} team={this.state.currentTeam}/>
					</div>
					<div className="userlist">
						<UserList team={this.state.rightTeam}/>
            {this.returnSideButton("team2")}
					</div>
				</div>
			</div>
		)
	}

  returnSideButton = (teamString) => {
    if (!this.props.isLoggedIn){
      return null;
    }
    else if (this.state.currentTeam != null && this.state.currentTeam === teamString) {
      return (<button className="btn btn-danger btn-block align-text-bottom mx-auto mb-1 rounded-0"
                      onClick={() => socket.emit('leaveTeamSelf', this.props.userInfo, roomInfo)}>Leave</button>)
    } else {
      return (<Button text={"Join"} team={teamString} onSelectTeam={this.onSelectTeam.bind(this)}/>)
    }
  };
}



const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    isLoggedIn: state.isloggedIn
  }
};

export default connect(mapStateToProps, null)(ChatRoom);