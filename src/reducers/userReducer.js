import { setNotification } from "./notificationReducer"

const userReducer = (state = null, action) => {
    switch (action.type) {
        case "LOAD":
            return action.data

        default:
            return state
    }
}

export const loadUser = user => {
    return dispatch => {
        dispatch({
            type: "LOAD",
            data: user
        })
        window.localStorage.setItem("user", JSON.stringify(user))
    }
}

export const logout = () => {
    window.localStorage.removeItem("user")
    return dispatch => {
        dispatch({
            type: "LOAD",
            data: null
        })
        dispatch(setNotification("You've logged out successfully.", "SUCCESS"))
    }
}

export default userReducer