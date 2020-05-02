const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case "SET":
            return action.data

        default:
            return state
    }
}

export const setNotification = (message, duration = 5) => {
    return dispatch => {
        dispatch({
            type: "SET",
            data: message
        })
        setTimeout(() => {
            dispatch({
                type: "SET",
                data: null
            })
        }, duration * 1000)
    }
}

export default notificationReducer