import axios from "axios";

export default {
    getReservation: function (id) {
        return axios.all([
            axios.get('/api/testing/reservations/' + id),
            axios.get('/api/testing/res_rooms/' + id)
        ])
            .then(axios.spread(function (resCust, resRooms) {
                return { resCust: resCust.data, resRooms: resRooms.data };
            }));
    }
}