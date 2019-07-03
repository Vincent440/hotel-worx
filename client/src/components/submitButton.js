import React from 'react';


function ButtonSubmit(props) {
    return(
    <div>
        <button class="btn btn-primary" style={{marginLeft:"480px"}} onClick={props.handleFormSubmit}>Submit</button>
    </div>
    );
}
export default ButtonSubmit;