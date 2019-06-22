import axios from "axios";

export default {
    sendLogin: function (loginData) {
        return axios.post("/login", loginData);
    }
};