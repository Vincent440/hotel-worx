import React from 'react';

export default function exitButton() {
    const styles = {
        float: "right",
        fontSize: "29px",
        width: "38px",
        height: "38px",
        border: "1px solid black",

    };

    return (
        <div>
            <button style={styles}>X
            </button >
        </div>
    );
}