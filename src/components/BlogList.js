import React from "react"
import { useSelector } from "react-redux"
import BlogCard from "./BlogCard"

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)
    const byLikes = (a, b) => b.likes - a.likes

    const blogsContainer = {
        display: "flex",
        flexWrap: "wrap",
        marginTop: "2em"
    }

    return <div style={blogsContainer}>
        {blogs.sort(byLikes)
            .map(blog =>
                <BlogCard key={blog.id} blog={blog} />
            )}
    </div>
}

export default BlogList