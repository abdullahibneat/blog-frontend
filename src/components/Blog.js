import React, { useState, useEffect } from "react"
import Toggable from "./Toggable"
import axios from "axios"
import PropTypes from "prop-types"

const blogStyle = {
    border: "solid",
    borderWidth: 1,
    margin: "1rem",
    padding: "0.5rem"
}


const Blog = ({ blog, deleteBlog }) => {
    const [likes, setLikes] = useState(blog.likes)
    const id = blog.id
    const cookie = JSON.parse(window.localStorage.getItem("user"))
    const username = cookie? cookie.name : ""

    useEffect(() => {
        const update = async () => await axios.put(`/api/blogs/${id}`, { likes })
        update()
    }, [likes, id])

    return <div style={blogStyle}>
        <h4>{blog.title}</h4>
        <p>by {blog.author}</p><Toggable buttonLabel="view">
            <p>{blog.URL}</p>
            <p>likes {likes} <button onClick={() => setLikes(likes+1)}>like</button></p>
            <p>Saved by {blog.user.name}</p>
            {username === blog.user.name? <button onClick={() => deleteBlog(blog)}>delete</button> : null}
        </Toggable>
    </div>
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    deleteBlog: PropTypes.func.isRequired
}

export default Blog
