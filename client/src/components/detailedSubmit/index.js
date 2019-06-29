import React from "react";
import "./style.css";
import SearchSubmit from "../searchButton";

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
                        <SearchSubmit/>
                    </td>
                </tr>
            </div>
        </form>

    )
}



export default DeatiledSubmit;