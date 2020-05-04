import { Intent, Toaster } from "@blueprintjs/core"

const toaster = Toaster.create()

const initialState = {
    message: null,
    intent: Intent.NONE
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET":
            const newState = action.data
            toaster.show(newState) // Display the notification
            return newState

        default:
            return state
    }
}

export const setNotification = (message, level = "NORMAL") => {
    return dispatch => {
        let intent

        switch (level) {
            case "ERROR":
                intent = Intent.DANGER
                break;

            case "SUCCESS":
                intent = Intent.SUCCESS
                break;
        
            default:
                intent = Intent.NONE
                break;
        }

        dispatch({
            type: "SET",
            data: { message, intent }
        })
    }
}

export default notificationReducer