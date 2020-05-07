import React from "react"
import { Card, AnchorButton } from "@blueprintjs/core"

const blogStyle = {
    flexGrow: 1,
    margin: "1em"
}

const BlogCard = ({ blog }) => <Card className="blogCard" key={blog.id} style={blogStyle}>
    <h2 style={{ marginTop: 0 }}>{blog.title}</h2>
    <p>by {blog.author}</p>
    <AnchorButton text="Read More" href={`/blogs/${blog.id}`} />
</Card>

export default BlogCard