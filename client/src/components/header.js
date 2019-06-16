import React from 'react';

function Header() {
    const styles = {
        backgroundColor: "#eeeeee",
        borderTop: "1px solid #999999",
        color: "#333333",
        fontSize: "12px"
    };

    return (
        <header style={styles}>
            <h2 className="p-2">Hotel Worx</h2>
        </header>
    );
}

export default Header;