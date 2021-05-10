const darkModeReducer = (state = true, action) => {
    switch (action.type) {
        case "SET_DARK":
            return action.data.dark
        case "SWITCH":
            localStorage.setItem("dark", !state)
            return !state
        default:
            return state
    }
}

export const loadDarkMode = () => {
    const dark = JSON.parse(localStorage.getItem("dark"))
    return dispatch => {
        dispatch({
            type: "SET_DARK",
            data: { dark }
        })
    }
}

export const switchDarkMode = () => {
    return dispatch => {
        dispatch({
            type: "SWITCH"
        })
    }
}

export default darkModeReducer