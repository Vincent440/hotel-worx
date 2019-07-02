import React from 'react';
import moment from "moment";


function Calendar() {
    return(
        
        <p> {moment().format('MMMM Do, YYYY')} </p>
        );
}
export default Calendar;