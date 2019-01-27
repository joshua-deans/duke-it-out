import React from 'react';

const User = (props) => {

    let style = {
        margin: '0px 0px 0px 0px'
    }

    let border = {
        width: '150px',
        height: '25px',
        borderBottom: '1px solid #e6e6e6',
        margin: '0px 0px 0px 0px',
    }

    return (
        <div style={border}>
            <h6 style={style}>{props.username}</h6>
        </div>
    )
}

export default User;