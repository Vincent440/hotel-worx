import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

// Import required Components and Utils
import UserContext from './UserContext'
import UserNavigationCard from './components/user_navigation_card'
import authapi from './utils/authapi'

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
import ParticlesBackground from './components/particles_background'

const PrivateAccessRoute = ({ component: Component, aId, ...rest }) => (
  <UserContext.Consumer>
    {({ user }) => (
      <Route
        {...rest}
        render={props =>
          user.access_id >= aId ? (
            <Component {...props} user={user} />
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    )}
  </UserContext.Consumer>
)

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
      user: {
        access_id: 0,
        type: 'Guest',
        user_id: 0,
        username: 'guest'
      },
      getUserStatus: this.getUserStatus,
      getUserLogout: this.getUserLogout,
      postUserLogin: this.postUserLogin
    }
  }

  render () {
    const { user } = this.state
    return (
      <UserContext.Provider value={this.state}>
        <Router>
          {user.access_id === 0 ? (
            <>
              <Redirect to='/' />
              <Login />
            </>
          ) : (
            <Container fluid className='m-0 p-0 w-100'>
              <ParticlesBackground />
              <Row className='m-0 p-3'>
                <Col lg={4} xl={3}>
                  <UserNavigationCard />
                </Col>

                <Col lg={8} xl={9}>
                  <Switch>
                    <PrivateAccessRoute
                      exact
                      strict
                      path='/'
                      component={Dashboard}
                      aId='1'
                    />
                    <PrivateAccessRoute
                      exact
                      path='/reserve/new'
                      component={NewReservation}
                      aId='1'
                    />
                    <PrivateAccessRoute
                      exact
                      path='/reserve/allreservations'
                      component={AllReservations}
                      aId='1'
                    />
                    <PrivateAccessRoute
                      exact
                      path='/reserve/updatereservation'
                      component={UpdateReservation}
                      aId='1'
                    />
                    <PrivateAccessRoute
                      exact
                      path='/reservationcomfirmation'
                      component={ReservationComfirmation}
                      aId='1'
                    />
                    <PrivateAccessRoute
                      exact
                      path='/frontdesk/arrivals'
                      component={Arrivals}
                      aId='1'
                    />
                    <PrivateAccessRoute
                      exact
                      path='/frontdesk/inhouse'
                      component={Inhouse}
                      aId='1'
                    />
                    <PrivateAccessRoute
                      exact
                      path='/frontdesk/maintenance'
                      component={Maintenance}
                      aId='1'
                    />
                    <PrivateAccessRoute
                      exact
                      path='/cashiering/billing'
                      component={Billing}
                      aId='1'
                    />
                    <PrivateAccessRoute
                      exact
                      path='/cashiering/payment'
                      component={Payment}
                      aId='1'
                    />
                    <PrivateAccessRoute
                      exact
                      path='/reports/housekeeping'
                      component={Housekeeping}
                      aId='1'
                    />
                    <PrivateAccessRoute
                      exact
                      path='/reports/detailedAvailability'
                      component={DetailedAvailability}
                      aId='1'
                    />
                    <PrivateAccessRoute
                      exact
                      path='/reports/houseStatus'
                      component={HouseStatus}
                      aId='1'
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
