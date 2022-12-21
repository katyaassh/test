import {getAuthInfo} from "./auth-reducer";

const INITIALIZATION_SUCCESS = 'INITIALIZATION_SUCCESS'

let initialState = {
    initialization: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZATION_SUCCESS:
            return {
                ...state,
                initialization: true
            }
        default:
            return state
    }
}

const initializeSuccess = () => {
    return {
        type: INITIALIZATION_SUCCESS
    }
}

export const initializeApp = () => async (dispatch) => {
    await dispatch(getAuthInfo())
    dispatch(initializeSuccess())
}

export default appReducer
