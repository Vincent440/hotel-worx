import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {UserContext} from '../UserContext'

export const PrivateAccessRoute = ({ component: Component, accessId, ...rest }) => (
  <UserContext.Consumer>
    {({ user }) => (
      <Route
        {...rest}
        render={props =>
          user.access_id >= accessId ? (
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
