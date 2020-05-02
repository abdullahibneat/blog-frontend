import React from "react"
import Toggable from "./Toggable"
import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux"
import { deleteBlog, like } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"

const blogStyle = {
    border: "solid",
    borderWidth: 1,
    margin: "1rem",
    padding: "0.5rem"
}

const Blog = ({ blog }) => {
    const dispatch = useDispatch()

    const username = useSelector(state => state.user? state.user.name : null)

    const handleLike = () => {
        blog.likes = blog.likes + 1
        dispatch(like(blog))
    }

    const handleDelete = () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            dispatch(deleteBlog(blog))
            dispatch(setNotification(`${blog.title} has been deleted`))
        }
    }

    return <div className="blog" style={blogStyle}>
        <h4 className="blogTitle">{blog.title}</h4>
        <p>by <span className="blogAuthor">{blog.author}</span></p><Toggable buttonLabel="view">
            <p className="blogURL">{blog.url}</p>
            <p>likes <span className="blogLikes">{blog.likes}</span> <button id="blogLikeButton" onClick={handleLike}>like</button></p>
            <p>Saved by {blog.user.name}</p>
            {username === blog.user.name ? <button onClick={handleDelete}>delete</button> : null}
        </Toggable>
    </div>
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired
}

export default Blog
