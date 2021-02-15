import React from 'react';

const Header: React.FC<{courseName: string}> = (props) => {
    return (
        <h1>{props.courseName}</h1>
    );
}

export default Header;