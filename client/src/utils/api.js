import axios from "axios";

export default {
    getReservation: (id) => {
        return axios.all([
            axios.get('/api/testing/reservations/' + id),
            axios.get('/api/testing/res_rooms/' + id)
        ])
            .then(axios.spread((resCust, resRooms) => {
                return { resCust: resCust.data, resRooms: resRooms.data };
            }));
    },
    createReservation: (data) => {
        return axios.post('/api/testing/reservation', data)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error);
            });
    }
}