import blogService from "../services/blogs"

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

export const initializeBlogs = () => {
    return async dispatch => {
        const data = await blogService.getAll()
        dispatch({
            type: "INIT",
            data
        })
    }
}

export default blogReducer