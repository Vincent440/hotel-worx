import React from 'react';

export default function Footer() {
    const styles = {
        backgroundColor: "#eeeeee",
        borderTop: "1px solid #999999",
        color: "#333333",
        fontSize: "12px"
    };
    
    return (
        <footer style={styles} className="d-flex align-items-center justify-content-center p-2 mt-4">
            Copyright &#169; 2019 Hotel Worx
            </footer>
    );
}