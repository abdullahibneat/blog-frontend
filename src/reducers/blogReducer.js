import blogService from "../services/blogs"

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case "INIT":
            return action.data

        case "CREATE":            
            return state.concat(action.data)

        case "LIKE":
            return state // TODO: Handle like

        case "DELETE":
            return state //TODO: Handle deletion
    
        default:
            return state;
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

export const createBlog = blog => {
    return async dispatch => {
        const user = JSON.parse(window.localStorage.getItem("user"))
        const data = await blogService.create(blog, user.token)
        dispatch({
            type: "CREATE",
            data
        })
    }
}

export default blogReducer