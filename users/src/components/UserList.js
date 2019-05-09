import React from 'react';

import User from "./User";

const UserList = props => {
    return (
        <div className="user-list-wrapper">
            {props.users.map(user => {
                return <User user={user} onClick={() => props.deleteUser(user.id)} key={user.id} />
            })}
        </div>
    )
}

export default UserList;