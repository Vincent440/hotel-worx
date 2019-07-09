import axios from "axios";

export default {
    getReservation: (id) => {
        return axios.all([
            axios.get('/api/testing/reservation/' + id),
            axios.get('/api/testing/res_rooms/' + id)
        ])
            .then(axios.spread((resCust, resRooms) => {
                return { resCust: resCust.data, resRooms: resRooms.data };
            }));
    },
    createReservation: (data) => {
        const fccNum = data.creditCard.replace(/ /g, "")
        return axios.post('/api/testing/reservation', {
            cust: [data.firstname, data.lastname, data.address, data.city, data.state, data.zip, data.email, data.phone, fccNum, data.expirationDate, 1],
            reserve: [1, ""],
            rooms: [[data.roomtype, data.arrivaldate, data.departuredate, data.adults, data.rate, data.comments]]
        })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getReservations: () => {
        return axios.get('/api/testing/reservations')
            .then((response) => {
                return response.data;
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
        const fname = criteria.firstname === "" ? "undefined" : criteria.firstname;
        const lname = criteria.lastname === "" ? "undefined" : criteria.lastname;
        const cnum = criteria.confirmationNumber === "" ? "undefined" : criteria.confirmationNumber;
        return axios.get('/api/testing/arrivals/' + sdate + "/" + fname + "/" + lname + "/" + cnum)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getRoomsArrivals: (date) => {
        return axios.get('/api/testing/rooms_arrivals/' + date)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    updateRoomCheckin: (id, room_id) => {
        return axios.put('/api/testing/checkinRoom/' + id + '/' + room_id)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    updateRoomCheckout: (id, room_id) => {
        return axios.put('/api/testing/checkoutRoom/' + id + '/' + room_id)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error);
            });
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