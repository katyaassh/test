import s from "./User.module.css";
import avatar from '../../../img/avatars/user.png'
import {NavLink} from "react-router-dom";

let User = (props) => {
    let onClick = () => {
        props.toggleSubscription(props.user.followed, props.user.id)
    }

    return (
        <div className={s.user}>
            <div className={s.userLeftSection}>
                <div className={s.userInfo}>
                    <NavLink to={'/profile/' + props.user.id}>
                        <img src={props.user.photos.small !== null ? props.user.photos.small : avatar} alt=""/>
                    </NavLink>
                    <div className={s.userDescription}>
                        <span className={s.userName}>{props.user.name}</span>
                        <span className={s.userStatus}>{props.user.status}</span>
                    </div>
                </div>
                <button disabled={props.followingProgress.some(id => id === props.user.id)} onClick={onClick}
                        className={s.followedButton}>{props.user.followed ? 'Unfollow' : 'Follow'}</button>
            </div>
            {/*<div className={s.userRightSection}>*/}
            {/*    {'props.user.location.city'}*/}
            {/*    {', '}*/}
            {/*    {'props.user.location.country'}*/}
            {/*</div>*/}
        </div>
    )
}

export default User
