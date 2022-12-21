import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

let initialState = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state
    }
}

export const setAuthUserData = (id, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        data: {id, email, login, isAuth}
    }
}

export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}

export const getAuthInfo = () => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    let response = await authAPI.getAuthInfo()
    if (response.resultCode === 0) {
        let {id, email, login} = response.data
        dispatch(setAuthUserData(id, email, login, true))
    }
    dispatch(toggleIsFetching(false))
}

export const login = (email, password, rememberMe, setSubmitting, setStatus) => async (dispatch) => {
    try {
        let response = await authAPI.login(email, password, rememberMe)
        if (response.data.resultCode === 0) {
            dispatch(getAuthInfo())
        } else {
            setStatus('Неправильный Email и/или пароль')
            setSubmitting(false)
        }
    } catch (error) {
        setStatus('Ошибка')
        setSubmitting(false)
    }
}
export const logout = () => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    } else {
        console.log('error')
    }
    dispatch(toggleIsFetching(false))
}


export default authReducer
