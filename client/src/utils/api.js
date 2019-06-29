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
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getArrivals: () => {
        return axios.get('/api/testing/todayArrivals')
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getDepartures: () => {
        return axios.get('/api/testing/todayDepartures')
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getCleanRooms: () => {
        return axios.get('/api/testing/rooms_clean')
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getDirtyRooms: () => {
        return axios.get('/api/testing/rooms_dirty')
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getInactiveRooms: () => {
        return axios.get('/api/testing/rooms_inactive')
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getOccupiedRooms: () => {
        return axios.get('/api/testing/rooms_occupied')
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getVacantRooms: () => {
        return axios.get('/api/testing/rooms_vacant')
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getAvailableRooms: () => {
        return axios.get('/api/testing/rooms_vacant')
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

// const test_reservation = { 
//     "cust": ["0first_name", "1last_name", "2address", "3city", "4state", "5zip", "6email", "7phone", "8credit_card_num", "9cc_expiration", "10active"],
//     "reserve": ["0user_id", "1comments"],
//     "rooms": [["0room_type_id", "1check_in_date", "2check_out_date", "2adults", "3confirmation_code", "4comments"]]
// }