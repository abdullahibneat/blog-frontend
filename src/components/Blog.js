import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { deleteBlog, like } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"
import { useParams, useHistory } from "react-router-dom"

const Blog = () => {
    const id = useParams().id
    const blog = useSelector(state => state.blogs)
        .find(b => b.id === id)

    const dispatch = useDispatch()
    const history = useHistory()

    const username = useSelector(state => state.user? state.user.name : null)

    const handleLike = () => {
        blog.likes = blog.likes + 1
        dispatch(like(blog))
    }

    const handleDelete = () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            dispatch(deleteBlog(blog))
            dispatch(setNotification(`${blog.title} has been deleted`))
            history.push("/")
        }
    }

    return blog
        ? <div className="blog">
            <h4 className="blogTitle">{blog.title}</h4>
            <p>by <span className="blogAuthor">{blog.author}</span></p>
                <p className="blogURL">{blog.url}</p>
                <p>likes <span className="blogLikes">{blog.likes}</span> <button id="blogLikeButton" onClick={handleLike}>like</button></p>
                <p>Saved by {blog.user.name}</p>
                {username === blog.user.name ? <button onClick={handleDelete}>delete</button> : null}
        </div>
        : <h4>Blog not found</h4>
}

export default Blog
