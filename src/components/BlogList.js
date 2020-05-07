import React, { useState } from "react"
import { useSelector } from "react-redux"
import BlogCard from "./BlogCard"
import { Spinner } from "@blueprintjs/core"

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)
    const [isLoading, setLoading] = useState(true)

    const byLikes = (a, b) => b.likes - a.likes

    // Show spinner for up to 5 seconds while fetching blogs
    if(blogs.length === 0) setTimeout(() => {
        setLoading(false)
    }, 5000)

    return blogs.length > 0
        ? <div className="blogContainer">
            {blogs.sort(byLikes)
                .map(blog =>
                    <BlogCard key={blog.id} blog={blog} />
                )}
        </div>
        : isLoading
            ? <Spinner />
            : <h4>No blogs have been created yet.</h4>
}

export default BlogList