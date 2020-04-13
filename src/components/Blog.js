import React from "react"
import Toggable from "./Toggable"

const blogStyle = {
    border: "solid",
    borderWidth: 1,
    margin: "1rem",
    padding: "0.5rem"
}

const Blog = ({ blog }) => (
    <div style={blogStyle}>
        {blog.title} <Toggable buttonLabel="view">
            <p>{blog.URL}</p>
            <p>{blog.likes} <button>like</button></p>
            <p>{blog.author}</p>
        </Toggable>
    </div>
)

export default Blog
