import React from "react"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { createBlog } from "../reducers/blogReducer"

const NewBlogForm = () => {
    const dispatch = useDispatch()

    const handleNewBlog = event => {
        event.preventDefault()
        event.persist()
        const blog = {
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value
        }
        try {
            dispatch(createBlog(blog))
            dispatch(setNotification(`A new blog ${blog.title} has been added.`))
            event.target.reset()
        } catch(err) {
            dispatch(setNotification(err.message))
        }
    }

    return <div>
        <h2>Create new</h2>
        <form id="newBlogForm" onSubmit={handleNewBlog}>
            <div>Title: <input type="text" id="newBlogTitle" name="title" /></div>
            <div>Author: <input type="text" id="newBlogAuthor" name="author" /></div>
            <div>URL: <input type="text" id="newBlogURL" name="url" /></div>
            <button type="submit">create</button>
        </form>
    </div>
}

export default NewBlogForm