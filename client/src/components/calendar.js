import React from 'react';
import moment from "moment";


function Calendar() {
    return(
    <div>
        <h5> {moment().format('MMMM Do, YYYY')}
        </h5>
    </div>
    );
}
export default Calendar;