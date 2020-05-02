const userReducer = (state = null, action) => {
    switch (action.type) {
        case "LOAD":
            return action.data
    
        default:
            return state
    }
}

export const loadUser = user => {
    return dispatch => dispatch({
        type: "LOAD",
        data: user
    })
}

export default userReducer