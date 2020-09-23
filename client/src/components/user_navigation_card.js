import React, { Component } from 'react'
import Logo from './logo'
import api from '../utils/api'
import UserContext from '../UserContext'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
class UserNavigationCard extends Component {
  state = {
    hotelInfo: []
  }
  makeAxiosCall = () => {
    api
      .getHotelInfo(1)
      .then(hotelData => this.setState({ hotelInfo: hotelData }))
      .catch(err => console.log(err))
  }
  componentDidMount () {
    this.makeAxiosCall()
  }
  render () {
    return (
      <UserContext.Consumer>
        {({ user, getUserLogout }) => (
          <Card bg='light' className='text-center'>
            <Card.Header>
              <Logo />
            </Card.Header>
            {this.state.hotelInfo.map(info => (
              <ListGroup variant='flush' key={info.hotel_info_id}>
                <ListGroup.Item>
                  <Card.Header className='bg-white border-0' as='h3'>
                    {info.hotel_name}
                  </Card.Header>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Card.Text>{info.address}</Card.Text>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Card.Text>
                    {info.city}, {info.state} {info.zip}
                  </Card.Text>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Card.Link href={'mailto:' + info.email}>
                    {info.email}
                  </Card.Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Card.Link href={'tel:' + info.phone}>
                    <i className='fa fa-phone fa-rotate-90 px-2'></i>&nbsp;
                    {info.phone}
                  </Card.Link>
                </ListGroup.Item>
              </ListGroup>
            ))}
            <Card.Body>
              <Card.Title className='text-center'>
                Greetings{' '}
                <Badge className='p-3' variant='secondary'>
                  {user.username}
                </Badge>
              </Card.Title>

              <Button
                onClick={getUserLogout}
                size='lg'
                block
                variant='outline-dark'
              >
                Logout&nbsp;<i className='fa fa-sign-out-alt'></i>
              </Button>
            </Card.Body>
          </Card>
        )}
      </UserContext.Consumer>
    )
  }
}

export default UserNavigationCard
