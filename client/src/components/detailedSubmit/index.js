import React from "react";
import "./style.css";

const DeatiledSubmit = props => {
    return (

        <form>
            <div id="res">
                <tr>
                    <td><p>Start Date</p></td>
                    <td><input
                        type="date"
                        name="arrivaldate"
                        onChange={props.handleStartDate}
                    /></td>
                    <td><p style={{ marginLeft: "80px", }}>Availability  </p></td>
                    <input type="checkbox" id="myCheck" onmouseover="myFunction()" onclick="alert('click event occured')" />

                    <td><p style={{ marginLeft: "80px", }}>Occupancy</p></td>
                    <input type="checkbox" id="myCheck" onmouseover="myFunction()" onclick="alert('click event occured')" />

                    <td>
                        <button id="searchButton" onClick={props.handleFormSubmit} style={{ marginLeft: "200px", marginBottom: "5px", }}>Search</button>
                    </td>
                </tr>
            </div>
        </form>

    )
}



export default DeatiledSubmit;