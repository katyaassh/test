import {subscriptionAPI, userAPI} from "../api/api";

const PROCESS_SUBSCRIPTION = 'PROCESS_SUBSCRIPTION'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS'


let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingProgress: []
}


const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROCESS_SUBSCRIPTION:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return {
                            ...user,
                            followed: !user.followed
                        }
                    }
                    return user
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_USERS_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.count
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingProgress: action.isFollowingProgress ?
                    [...state.followingProgress, action.id]
                    : state.followingProgress.filter(id => id !== action.id)
            }

        default:
            return state
    }
}

export const processSubscription = (userId) => {
    return {
        type: PROCESS_SUBSCRIPTION,
        userId
    }
}

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }
}
export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}
export const setUsersTotalCount = (count) => {
    return {
        type: SET_USERS_TOTAL_COUNT,
        count
    }
}
export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}
export const setFollowingInProgress = (isFollowingProgress, id) => {
    return {
        type: FOLLOWING_IN_PROGRESS,
        isFollowingProgress,
        id
    }
}

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
        dispatch(toggleIsFetching(true))
        let data = await userAPI.getUsers(currentPage, pageSize)
            dispatch(setCurrentPage(currentPage))
            dispatch(setUsers(data.items))
            dispatch(setUsersTotalCount(data.totalCount))
            dispatch(toggleIsFetching(false))
}

export const toggleSubscription = (isFollowed, id) => async (dispatch) => {
        dispatch(setFollowingInProgress(true, id))
        const resultCode = isFollowed ? await subscriptionAPI.unfollow(id) : await subscriptionAPI.follow(id)
            if (resultCode === 0) {
                dispatch(processSubscription(id))
            }
            dispatch(setFollowingInProgress(false, id))
}

export default usersReducer
