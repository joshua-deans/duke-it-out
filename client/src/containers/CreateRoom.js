import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

class CreateRoom extends Component {
    render() {
        return(
            <Container>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Form>
                            <FormGroup>
                                <Label for="roomName">Room Name</Label>
                                <Input type="text" name="roomName" id="roomName" placeholder="Room Name" />
                            </FormGroup>
                            <Button>Submit</Button>
                        </Form>
                    </Col>

                </Row>
            </Container>

        )
    }
}

export default CreateRoom;