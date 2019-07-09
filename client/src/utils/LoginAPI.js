import axios from "axios";

export default {

  getLoginStatus: async () => {
    try {
      const res = await axios.get('/api/login/status');
      return res.data;
    }
    catch (err) {
      return console.log(err);
    }
  },
  postUserLogin: async (user,done) => {
    try {
      const res = await axios.post('/api/login', user);
      // Async function for logging in, setting up callback to return two params, ( error: false if no error, res.data: userData from server )
      return (res.data.user.username ? (done(false,res.data)) : (done(false,"error logging in")) );
    }
    catch (err) {
      console.log("serverside error thrown failed log in attempt");
      return done(true,null);
    }
  },
  getLoggedOut: async () => {
    try {
      const res = await axios.get('/api/logout');
      console.log(res);
      return res;
    }
    catch (err) {
      return console.log(err);
    }
  }
}