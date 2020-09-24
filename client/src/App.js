import React from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

// Import required Components and Utils
import { UserContext, user } from './UserContext'
import UserNavigationCard from './components/user_navigation_card'
import authapi from './utils/authapi'
import ParticlesBackground from './components/particles_background'
import { PrivateAccessRoute } from './components/private_access_route'

// Import all pages
import Login from './pages/login'
import NewReservation from './pages/new_reservation'
import UpdateReservation from './pages/update_reservation'
import AllReservations from './pages/all_reservations'
import ReservationComfirmation from './pages/reservation_comfirmation'
import Dashboard from './pages/dashboard'
import Arrivals from './pages/arrivals'
import Billing from './pages/billing'
import Payment from './pages/payment'
import Inhouse from './pages/inhouse'
import Housekeeping from './pages/housekeeping'
import DetailedAvailability from './pages/detailed_availability'
import HouseStatus from './pages/house_status'
import Maintenance from './pages/maintenance'

class App extends React.Component {
  constructor () {
    super()
    this.postUserLogin = userData => {
      if (userData) {
        authapi.postUserLogin(userData, (err, res) => {
          if (err === true) {
            return console.log('Failed to log in')
          }
          this.setState({ user: res.user })
        })
      }
    }
    this.getUserLogout = event => {
      event.preventDefault()
      authapi.getLoggedOut().then(this.getUserStatus)
    }
    this.getUserStatus = () => {
      authapi.getLoginStatus().then(res => {
        if (res) {
          this.setState(() => ({ user: res.user }))
        }
      })
    }
    this.state = {
      user: user,
      getUserStatus: this.getUserStatus,
      getUserLogout: this.getUserLogout,
      postUserLogin: this.postUserLogin
    }
  }
  componentDidMount () {
    if (this.state.user.access_id === 0) {
      this.state.getUserStatus()
    }
  }
  render () {
    const { user } = this.state
    return (
      <UserContext.Provider value={this.state}>
        <Router>
          {user.access_id === 0 ? (
            <>
              <Redirect to={'/'} />
              <Login />
            </>
          ) : (
            <Container fluid className='m-0 p-0 w-100'>
              <ParticlesBackground />
              <Row className='m-0 pt-3 p-3'>
                <Col lg={4} xl={3}>
                  <UserNavigationCard />
                </Col>
                <Col lg={8} xl={9}>
                  <Switch>
                    <PrivateAccessRoute strict path='/' component={Dashboard} />
                    <PrivateAccessRoute
                      path='/reserve/new'
                      component={NewReservation}
                    />
                    <PrivateAccessRoute
                      path='/reserve/allreservations'
                      component={AllReservations}
                    />
                    <PrivateAccessRoute
                      path='/reserve/updatereservation'
                      component={UpdateReservation}
                    />
                    <PrivateAccessRoute
                      path='/reservationcomfirmation'
                      component={ReservationComfirmation}
                    />
                    <PrivateAccessRoute
                      path='/frontdesk/arrivals'
                      component={Arrivals}
                    />
                    <PrivateAccessRoute
                      path='/frontdesk/inhouse'
                      component={Inhouse}
                    />
                    <PrivateAccessRoute
                      path='/frontdesk/maintenance'
                      component={Maintenance}
                    />
                    <PrivateAccessRoute
                      path='/cashiering/billing'
                      component={Billing}
                    />
                    <PrivateAccessRoute
                      path='/cashiering/payment'
                      component={Payment}
                    />
                    <PrivateAccessRoute
                      path='/reports/housekeeping'
                      component={Housekeeping}
                    />
                    <PrivateAccessRoute
                      path='/reports/detailedAvailability'
                      component={DetailedAvailability}
                    />
                    <PrivateAccessRoute
                      path='/reports/houseStatus'
                      component={HouseStatus}
                    />
                  </Switch>
                </Col>
              </Row>
            </Container>
          )}
        </Router>
      </UserContext.Provider>
    )
  }
}

export default App
