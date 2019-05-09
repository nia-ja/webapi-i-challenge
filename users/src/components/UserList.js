import React from 'react';

import User from "./User";

const UserList = props => {
    return (
        <div className="user-list-wrapper">
            {props.users.map(user => {
                return <User user={user} deleteUser={props.deleteUser} key={user.id} />
            })}
        </div>
    )
}

export default UserList;