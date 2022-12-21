import {authAPI, profileAPI} from "../api/api";
import {getAuthInfo} from "./auth-reducer";

const ADD_POST = 'ADD_POST'
const UPDATE_LIKES_COUNT = 'UPDATE_LIKES_COUNT'
const SET_PROFILE = 'SET_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SET_PHOTO = 'SET_PHOTO'

let initialState = {
    posts: [
        {id: 3, message: 'Hi, how are you?', likeCount: 0},
        {id: 2, message: 'It`s my first post', likeCount: 0},
        {id: 1, message: 'It`s my first post', likeCount: 0}
    ],
    profile: null,
    status: '',

}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: state.posts[0].id + 1,
                message: action.postText,
                likeCount: 0
            }
            return {
                ...state,
                posts: [newPost, ...state.posts]
            }
        case UPDATE_LIKES_COUNT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post.id === action.postId) {
                        return {
                            ...post,
                            likeCount: post.likeCount + 1
                        }
                    }
                    return post
                })
            }
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SET_PHOTO:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                }
            }

        default:
            return state
    }
}

export const addPost = (postText) => {
    return {
        type: ADD_POST,
        postText
    }
}

export const updateLikesCount = (postId) => {
    return {
        type: UPDATE_LIKES_COUNT,
        postId
    }
}
export const setProfile = (profile) => {
    return {
        type: SET_PROFILE,
        profile
    }
}

export const getProfile = (id) => async (dispatch) => {
    let response = await profileAPI.getProfile(id)
    dispatch(setProfile(response))
}

export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status
    }
}

export const getStatus = (id) => async (dispatch) => {
    let response = await profileAPI.getStatus(id)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const setPhoto = (photos) => {
    return {
        type: SET_PHOTO,
        photos
    }
}

export const updatePhoto = (photo) => async (dispatch) => {
    let response = await profileAPI.updatePhoto(photo)
    if (response.data.resultCode === 0) {
        dispatch(setPhoto(response.data.data.photos))
    }
}

export const updateProfile = (data, onSuccess) => async (dispatch) => {
    let response = await profileAPI.updateProfile(data)
    if (response.data.resultCode === 0) {
        onSuccess()
    }
    //
    // try {
    //     let response = await profileAPI.updateProfile(data)
    //     if (response.data.resultCode === 0) {
    //         onSuccess()
    //     } else {
    //         setStatus('Неправильный Email и/или пароль')
    //     }
    // } catch (error) {
    //     setStatus('Ошибка')
    // }
}


export default profileReducer
