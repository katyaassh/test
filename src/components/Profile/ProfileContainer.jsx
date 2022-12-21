import './Profile.module.css'
import {connect} from "react-redux";
import React, {useEffect} from "react";
import Profile from "./Profile";
import {getProfile, getStatus, updatePhoto, updateStatus} from "../../redux/profile-reducer";
import {useParams} from "react-router-dom";
import {withAuthRedirect} from "../../shared/hocs/withAuthRedirect";
import {compose} from "redux";


const ProfileContainer = (props) => {
    const params = useParams()
    useEffect(() => {
        let userId = params.userId
        if (!userId) {
            userId = props.authorizedUserId
        }
        props.getProfile(userId)
        props.getStatus(userId)
    }, [params.userId, props.getProfile])

    return <Profile
        isOwner={!params.userId}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        photo={props.photo}
        updatePhoto={props.updatePhoto}
    />
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        photo: state.profilePage.photo
    }
}

export default compose(
    connect(mapStateToProps, {
        getProfile,
        getStatus,
        updateStatus,
        updatePhoto
    }),
    withAuthRedirect
)(ProfileContainer)


