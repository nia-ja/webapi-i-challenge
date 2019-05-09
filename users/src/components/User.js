import React from "react";

const User = props => {
    return (
        <div className="user-wrapper">
            <div className="user-content">
                <h1>{props.user.name}</h1>
                <p>{props.user.bio}</p>
            </div>
            <div className="user-controls">
                <button className="btn" onClick={() => props.deleteUser(props.user.id)}>✘</button>
                <button className="btn edit">✎</button>
            </div>
        </div>
    ) 
}

export default User;