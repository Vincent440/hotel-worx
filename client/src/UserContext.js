import React from 'react'

// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
const UserContext = React.createContext({
  user: {
    access_id: 0,
    type: 'Guest',
    user_id: 0,
    username: 'guest'
  },
  getUserStatus: () => {},
  postUserLogin: () => {},
  getUserLogout: () => {}
})
export default UserContext
