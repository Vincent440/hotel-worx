import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';


export default class MyComponent extends React.Component {
    render() {
        return (
            <Moment parse="YYYY-MM-DD HH:mm">
                                1976-04-19 12:59

        </Moment>);
    }
}