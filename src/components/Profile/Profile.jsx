import './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Loader from "../../shared/components/Loader/Loader";

const Profile = (props) => {


    return <div>
        {props.profile ? <ProfileInfo
            isOwner={props.isOwner}
            profile={props.profile}
            status={props.status}
            updateStatus={props.updateStatus}
            photo={props.photo}
            updatePhoto={props.updatePhoto}
        /> : <Loader /> }
        <MyPostsContainer />
    </div>
}

export default Profile;
