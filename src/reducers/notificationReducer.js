import { Intent, Toaster } from "@blueprintjs/core"

const toaster = Toaster.create()

const initialState = {
    message: null,
    intent: Intent.NONE
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET":
            toaster.show(action.data) // Display the notification
            return action.data

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
                break

            case "SUCCESS":
                intent = Intent.SUCCESS
                break

            default:
                intent = Intent.NONE
                break
        }

        dispatch({
            type: "SET",
            data: { message, intent }
        })
    }
}

export default notificationReducer