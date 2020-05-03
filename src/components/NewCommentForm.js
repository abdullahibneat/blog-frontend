import React from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import blogService from "../services/blogs"
import { updateBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"

const NewCommentForm = () => {
    const id = useParams().id
    const dispatch = useDispatch()

    const handleSubmit = event => {
        event.preventDefault()
        blogService.comment(id, event.target.comment.value)
            .then(blog => dispatch(updateBlog(blog)))
            .catch(err => dispatch(setNotification("Comment cannot be empty")))
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <input name="comment" /> <button>add comment</button>
        </form>
    </div>
}

export default NewCommentForm