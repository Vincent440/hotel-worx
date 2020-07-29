import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

import Logo from '../../components/logo/logo'
import BackgroundSlider from 'react-background-slider'
import hotelBell from './hotel-bell.jpg'
import hotelEntrance from './hotel-entrance.jpg'
import hotelLobby from './hotel-lobby.jpg'
import hotelRoom from './hotel-room.jpg'
import UserContext from '../../UserContext'
import Card from 'react-bootstrap/Card'

class Login extends Component {
  constructor (props) {
    super(props)
    this.handleInputChange = event => {
      const { name, value } = event.target
      this.setState({ [name]: value })
    }
    this.handleSubmit = event => {
      event.preventDefault()
      if (!this.isFormInValid()) {
        this.context.postUserLogin({
          username: this.state.username,
          password: this.state.password
        })
      }
    }
    this.state = {
      username: 'user',
      password: '123123'
    }
  }
  componentDidMount () {
    if (this.context.user.access_id === 0) {
      this.context.getUserStatus()
    }
  }
  isFormInValid = () => {
    if (this.state.username.length < 4 || this.state.password.length < 5) {
      return true
    } else {
      return false
    }
  }

  render () {
    return (
      <>
        <Container>
          <BackgroundSlider
            images={[hotelBell, hotelEntrance, hotelLobby, hotelRoom]}
            duration={5}
            transition={1}
          />

            <Row className='justify-content-center'>
              <Col xs={10} sm={9} md={8} lg={3}>
          <Card className='text-center' bg='light'>
            <Logo />
                <Card.Body>
                  <Form onSubmit={e => this.handleSubmit(e)}>
                    <Form.Row className='justify-content-center'>
                      <Col xs={10}>
                        <Form.Group controlId='loginUsername'>
                          <Form.Label>Username</Form.Label>
                          <Form.Control
                            size='lg'
                            onChange={this.handleInputChange}
                            value={this.state.username}
                            autoComplete='Username'
                            type='text'
                            name='username'
                          />
                        </Form.Group>
                      </Col>
                    </Form.Row>
                    <Form.Row className='justify-content-center'>
                      <Col xs={10}>
                        <Form.Group controlId='loginPassword'>
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            size='lg'
                            onChange={this.handleInputChange}
                            value={this.state.password}
                            autoComplete='current-password'
                            type='password'
                            name='password'
                          />
                        </Form.Group>
                      </Col>
                    </Form.Row>
                    <Row>
                      <Col xs={12}>
                        <Button
                          disabled={this.isFormInValid()}
                          type='submit'
                          size='block'
                          variant='primary'
                        >
                          Login
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
          </Card>
              </Col>
            </Row>
        </Container>
      </>
    )
  }
}

Login.contextType = UserContext

export default Login
