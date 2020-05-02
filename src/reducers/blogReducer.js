const blogReducer = (state = [], action) => {
    switch (action.type) {
        case "INIT":
            return action.data

        case "LIKE":
            return state // TODO: Handle like

        case "DELETE":
            return state //TODO: Handle deletion
    
        default:
            break;
    }
}

export default blogReducer