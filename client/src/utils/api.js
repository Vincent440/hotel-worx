import axios from "axios";

export default {
    getReservation: (id) => {
        return axios.all([
            axios.get('/api/hw/reservation/' + id),
            axios.get('/api/hw/res_rooms/' + id)
        ])
            .then(axios.spread((resCust, resRooms) => {
                return { resCust: resCust.data, resRooms: resRooms.data };
            }));
    },
    createReservation: (data) => {
        const fccNum = data.creditCard.replace(/ /g, "")
        return axios.post('/api/hw/reservation', {
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
        return axios.get('/api/hw/reservations')
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getRoomTypes: () => {
        return axios.get('/api/hw/room_types')
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
        return axios.get('/api/hw/arrivals/' + sdate + "/" + fname + "/" + lname + "/" + cnum)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getDepartures: (criteria) => {
        const fname = criteria.firstname === "" ? "undefined" : criteria.firstname;
        const lname = criteria.lastname === "" ? "undefined" : criteria.lastname;
        const rnum = criteria.roomNumber === "" ? "undefined" : criteria.roomNumber;
        return axios.get('/api/hw/departures/' + fname + "/" + lname + "/" + rnum)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getGuests: (criteria) => {
        const fname = criteria.firstname === "" ? "undefined" : criteria.firstname;
        const lname = criteria.lastname === "" ? "undefined" : criteria.lastname;
        const rnum = criteria.roomNumber === "" ? "undefined" : criteria.roomNumber;
        const cnum = criteria.confirmationNumber === "" ? "undefined" : criteria.confirmationNumber;
        return axios.get('/api/hw/guests/' + fname + "/" + lname + "/" + rnum + "/" + cnum)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getRoomsArrivals: (date) => {
        return axios.get('/api/hw/rooms_arrivals/' + date)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    updateRoomCheckin: (id, room_id) => {
        return axios.put('/api/hw/checkinRoom/' + id + '/' + room_id)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    updateRoomCheckout: (id, room_id) => {
        return axios.put('/api/hw/checkoutRoom/' + id + '/' + room_id)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    updateCleanStatus: (room_id, status) => {
        return axios.put('/api/hw/updateCleanStatus/' + status + '/' + room_id)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getAvailableRooms: (date) => {
        return axios.all([
            axios.get('/api/hw/room_types'),
            axios.get('/api/hw/room_types_available/' + date)
        ])
            .then(axios.spread((roomTypes, typeData) => {
                return { roomTypes: roomTypes.data, typeData: typeData.data[1] };
            }));
    },
    getHouseKeepingStatus: (checked) => {
        return axios.get("/api/hw/housekeeping_status/" + checked.clean + "/" + checked.dirty + "/" + checked.outOfOrder + "/" + checked.vacant + "/" + checked.occupied + "/" + checked.arrival + "/" + checked.arrived + "/" + checked.stayOver + "/" + checked.dueOut + "/" + checked.departed + "/" + checked.notReserved)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getTaxRates: () => {
        return axios.get('/api/hw/tax_rates')
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
}