import React, { Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import User from './User'

class Userlist extends Component {
    state = {
        users: [
            {username: "Josh",
            email: "Josh@gmail.com"},
            {username: "Ethan",
            email: "Ethan@gmail.com"}
        ]
    }

    render () {

        let style = {
            height: '100vh',
            width: '200px',
            border: '1px solid #e6e6e6'
        }

        return (
            <div style={style}> 

                <Container>
                    {this.state.users.map(user => 
                    (<Row>
                        <Col>
                            <User username={user.username} />
                        </Col>
                    </Row>))}
                </Container>
            </div>

        )
    }
}

export default Userlist;