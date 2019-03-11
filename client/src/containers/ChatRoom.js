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
        leftTeam: {title: "", members: ["John", "Andrew", "Bob"]},
        rightTeam: {title: "", members: ["Andy", "Kyle"]},
        currentMsg: '',
        loaded: false,
        messageList: []
      };
      this.getRoomInfo();
    } else {
      roomInfo = this.props.location.state.roomInfo;
      this.getPreviousMessages(roomInfo.id);
      socket = io();
      socket.on('connect', () => {
        socket.emit('clientInfo', this.props.userInfo, roomInfo);
      });
      socket.on('verified message', (msg, date, userInfo) => {
        this.setState({messageList: [...this.state.messageList, {body: msg, date: date, userInfo: userInfo}]});
      });
      this.state = {
        roomName: roomInfo.name,
        leftTeam: {title: roomInfo.team1, members: ["John", "Andrew", "Bob"]},
        rightTeam: {title: roomInfo.team2, members: ["Andy", "Kyle"]},
        currentMsg: '',
        loaded: true,
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
      socket.on('connect', () => {
        socket.emit('clientInfo', this.props.userInfo, data[0]);
      });
      socket.on('verified message', (msg, date, userInfo) => {
        this.setState({messageList: [...this.state.messageList, {body: msg, date: date, userInfo: userInfo}]});
      });
    }).catch(error => {
      console.log(error);
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
      var self = this;
      data.forEach(val => {
        var currUserInfo = {
          id: val.creator_id,
          username: val.username,
          email: val.email};
        self.setState({messageList: [...self.state.messageList,
            {body: val.message, date: val.timestamp, userInfo: currUserInfo}]});
      })
    })
	}

  sendMessage = (event) => {
		event.preventDefault();
		if (this.props.isLoggedIn) {
      socket.emit('sent message', this.state.currentMsg, new moment().format(), this.props.userInfo, roomInfo.id);
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
		let messages = this.state.messageList;
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
				<div className="d-flex justify-content-center h-100" style={{minHeight: "500px"}}>
					<div className="userlist">
						<UserList team={this.state.leftTeam}/>
            <Button text={"Join"} team="team1" onSelectTeam={this.onSelectTeam.bind(this)} />
					</div>
					<div className="chatbox">
						<Header title={this.state.roomName} header_type="chat"/>
						<div id="msgBox" className="msgBoxStyle">
							{this.state.messageList.slice(0).reverse().map((message, index) => (
							<Message body={ message.body } date={ message.date } senderInfo={message.userInfo} />
							))}
						</div>
						<MessageInput value={this.state.currentMsg} onSubmitEvent={this.sendMessage}
              onChangeValue={this.handleChangeMessage} isLoggedIn={this.props.isLoggedIn}/>
					</div>
					<div className="userlist">
						<UserList team={this.state.rightTeam}/>
            <Button text={"Join"} team="team2" onSelectTeam={this.onSelectTeam.bind(this)} />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    isLoggedIn: state.isloggedIn
  }
};

export default connect(mapStateToProps, null)(ChatRoom);