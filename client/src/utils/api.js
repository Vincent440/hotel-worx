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
        return axios.post('/api/testing/reservation', {
            cust: [data.firstname, data.lastname, data.address, data.city, data.state, data.zip, data.email, data.phone, data.creditCard, data.expirationDate, 1],
            reserve: [1, ""],
            rooms: [[data.roomtype, data.arrivaldate, data.departuredate, data.adults, "test_code", ""]]
        })
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
    getArrivals: (criteria) => {
        const sdate = criteria.startDateRange === "" ? "undefined" : criteria.startDateRange;
        const edate = criteria.endDateRange === "" ? "undefined" : criteria.endDateRange;
        const fname = criteria.firstname === "" ? "undefined" : criteria.firstname;
        const lname = criteria.lastname === "" ? "undefined" : criteria.lastname;
        const cnum = criteria.confirmationNumber === "" ? "undefined" : criteria.confirmationNumber;
        return axios.get('/api/testing/arrivals/' + sdate + "/" + edate + "/" + fname + "/" + lname + "/" + cnum)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getReservation1: (id) => {
        return axios.all([
            axios.get('/api/testing/reservations/' + id),
            axios.get('/api/testing/res_rooms/' + id)
        ])
            .then(axios.spread((resCust, resRooms) => {
                return { resCust: resCust.data, resRooms: resRooms.data };
            }));
    },
    getDepartures: () => {
        return axios.get('/api/testing/departures')
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
    getAvailableRooms: (date) => {
        return axios.all([
            axios.get('/api/testing/room_types'),
            axios.get('/api/testing/room_types_available/' + date)
        ])
            .then(axios.spread((roomTypes, typeData) => {
                return { roomTypes: roomTypes.data, typeData: typeData.data[1] };
            }));
},
getReservation1: (id) => {
    return axios.all([
        axios.get('/api/testing/reservations/' + id),
        axios.get('/api/testing/res_rooms/' + id)
    ])
        .then(axios.spread((resCust, resRooms) => {
            return { resCust: resCust.data, resRooms: resRooms.data };
        }));
},
    getHouseKeepingStatus: (checked) => {
        return axios.get("/api/testing/housekeeping_status/" + checked.clean + "/" + checked.dirty + "/" + checked.outOfOrder + "/" + checked.vacant + "/" + checked.occupied + "/" + checked.arrival + "/" + checked.arrived + "/" + checked.stayOver + "/" + checked.dueOut + "/" + checked.departed + "/" + checked.notReserved)
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
