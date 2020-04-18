import React, { useState } from "react"
import PropTypes from "prop-types"

const NewBlogForm = ({ onSubmitForm }) => {
    const [newBlogTitle, setNewBlogTitle] = useState("")
    const [newBlogAuthor, setNewBlogAuthor] = useState("")
    const [newBlogURL, setNewBlogURL] = useState("")

    const handleNewBlog = event => {
        event.preventDefault()
        const blog = {
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogURL
        }
        onSubmitForm(blog)
        setNewBlogTitle("")
        setNewBlogAuthor("")
        setNewBlogURL("")
    }

    return <div>
        <h2>Create new</h2>
        <form id="newBlogForm" onSubmit={handleNewBlog}>
            <div>Title: <input type="text" id="newBlogTitle" name="title" value={newBlogTitle} onChange={({ target }) => setNewBlogTitle(target.value)} /></div>
            <div>Author: <input type="text" id="newBlogAuthor" name="author" value={newBlogAuthor} onChange={({ target }) => setNewBlogAuthor(target.value)} /></div>
            <div>URL: <input type="text" id="newblogURL" name="url" value={newBlogURL} onChange={({ target }) => setNewBlogURL(target.value)} /></div>
            <button type="submit">create</button>
        </form>
    </div>
}

NewBlogForm.propTypes = {
    onSubmitForm: PropTypes.func.isRequired
}

export default NewBlogForm