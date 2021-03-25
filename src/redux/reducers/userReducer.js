import { USER_LOGIN_SUCCESS,
         USER_LOGOUT,
         USER_REGISTER_SUCCESS 
        } 
from '../constants/userConstants'

const authReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case USER_LOGOUT:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

const regReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_SUCCESS:
                return {
                    ...state,
                    ...action.payload
                }
        default:
            return state
    }
}


export {
    authReducer,
    regReducer
}

