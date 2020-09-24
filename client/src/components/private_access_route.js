import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {UserContext} from '../UserContext'

/**
 * A functional component that restricts access to routes, 
 * only if a user doesn't meet the criteria of having a equal or higher 'access_id'
 * 
 * Uses the React Context API to get the user data.
 * @param {Object} Component The page to be displayed on the specified route prop
 * @param {number=} [accessId=1] Determines who can view the route, based on the database access_id of the user role.
 */
export const PrivateAccessRoute = ({ component: Component, accessId = 1, ...rest }) => (
  <UserContext.Consumer>
    {({ user }) => (
      <Route
        exact
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
