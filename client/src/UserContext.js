import React from 'react'
export const user = {
  user_id: 0,
  username: 'guest',
  access_id: 0,
  type: 'Guest'
}
// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
export const UserContext = React.createContext({
  user,
  getUserStatus: () => {},
  postUserLogin: () => {},
  getUserLogout: () => {}
})
