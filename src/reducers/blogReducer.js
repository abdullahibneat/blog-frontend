import blogService from "../services/blogs"

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case "INIT":
            return action.data

        case "CREATE":            
            return state.concat(action.data)

        case "UPDATE":
            return state.map(blog => blog.id === action.data.id? action.data : blog)

        case "DELETE":
            return state.filter(blog => blog.id !== action.data)
    
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
    return async (dispatch, getState) => {
        const data = await blogService.create(blog, getState().user.token)
        dispatch({
            type: "CREATE",
            data
        })
    }
}

export const updateBlog = blog => {
    return async dispatch => {
        await blogService.updateLikes(blog)
        dispatch({
            type: "UPDATE",
            data: blog
        })
    }
}

export const deleteBlog = blog => {
    return async (dispatch, getState) => {
        await blogService.deleteBlog(blog, getState().user.token)
        dispatch({
            type: "DELETE",
            data: blog.id
        })
    }
}

export default blogReducer