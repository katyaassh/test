import s from "./Users.module.css";
import User from "./User/User";
import React from "react";

let Users = (props) => {
    return (
        <div className={s.usersPage}>
            <div>
                {
                    props.users.map((user) => (
                        <User
                            user={user}
                            key={user.id}
                            followingProgress={props.followingProgress}
                            toggleSubscription={props.toggleSubscription}
                        />
                    ))
                }
            </div>
        </div>
    )
}


export default Users;
