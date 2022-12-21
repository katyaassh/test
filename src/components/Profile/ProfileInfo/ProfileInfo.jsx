import s from './ProfileInfo.module.css'
import avatar from '../../../img/avatars/user.png'
import {Contacts} from "./Contacts/Contacts";
import {ProfileStatus} from "./ProfileStatus/ProfileStatus";
import {NavLink} from "react-router-dom";

const ProfileInfo = (props) => {

    const savePhoto = (e) => {
        props.updatePhoto(e.target.files[0])
    }

    return (
        <div className={s.profile}>
            <div>
                <img src={props.profile.photos.large || avatar} alt="" className={s.profileAvatar}/>
                {props.isOwner ? <input type={'file'} onChange={savePhoto} accept="image/*"/> : null}
            </div>
            <div>
                <NavLink to={'/profile/edit'}>Редактировать профиль</NavLink>
                <div className={s.profileName}>{props.profile.fullName}</div>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
                <div className={s.profileStatus}>{props.profile.aboutMe}</div>
                <div>{props.profile.lookingForAJob ? 'Ищу работу' : 'Не ищу работу'}</div>
                <div className={s.profileJobInfo}>{props.profile.lookingForAJobDescription}</div>
                <Contacts contacts={props.profile.contacts}/>
            </div>
        </div>
    )
}
export default ProfileInfo;
