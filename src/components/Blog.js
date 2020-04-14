import React, { useState, useEffect } from "react"
import Toggable from "./Toggable"
import PropTypes from "prop-types"

const blogStyle = {
    border: "solid",
    borderWidth: 1,
    margin: "1rem",
    padding: "0.5rem"
}


const Blog = ({ blog, deleteBlog, updateLikes }) => {
    const [likes, setLikes] = useState(blog.likes)
    const cookie = JSON.parse(window.localStorage.getItem("user"))
    const username = cookie? cookie.name : ""

    useEffect(() => {
        blog.likes = likes
        updateLikes(blog)
    }, [likes, blog, updateLikes])

    return <div style={blogStyle}>
        <h4 className="blogTitle">{blog.title}</h4>
        <p>by <span className="blogAuthor">{blog.author}</span></p><Toggable buttonLabel="view">
            <p className="blogURL">{blog.url}</p>
            <p>likes <span className="blogLikes">{likes}</span> <button onClick={() => setLikes(likes+1)}>like</button></p>
            <p>Saved by {blog.user.name}</p>
            {username === blog.user.name? <button onClick={() => deleteBlog(blog)}>delete</button> : null}
        </Toggable>
    </div>
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    updateLikes: PropTypes.func.isRequired
}

export default Blog
