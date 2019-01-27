import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import UserList from '../components/UserList';

class App extends Component {
  state = {
  };

  render () {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col md="4">
              <UserList />
            </Col>
            <Col md="4">
            <h1>Hello</h1>
            </Col>
            <Col md="4">
              <UserList />
            </Col>
          </Row>
        </Container>
        
      </div>
    );
  }
}

export default App;
