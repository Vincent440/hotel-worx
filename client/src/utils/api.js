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
    },
    getRoomTypes: () => {
        return axios.get('/api/testing/room_types')
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    getArrivals: () => {
        return axios.get('/api/testing/todayArrivals')
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    getDepartures: () => {
        return axios.get('/api/testing/todayDepartures')
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    getCleanRooms: () => {
        return axios.get('/api/testing/rooms_clean')
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    getDirtyRooms: () => {
        return axios.get('/api/testing/rooms_dirty')
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    getInactiveRooms: () => {
        return axios.get('/api/testing/rooms_inactive')
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    getOccupiedRooms: () => {
        return axios.get('/api/testing/rooms_occupied')
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    getVacantRooms: () => {
        return axios.get('/api/testing/rooms_vacant')
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}