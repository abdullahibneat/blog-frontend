import React from "react"
import { Card, AnchorButton } from "@blueprintjs/core"
import PropTypes from "prop-types"

const BlogCard = ({ blog }) => <Card className="blogCard" key={blog.id}>
    <h2 style={{ marginTop: 0 }}>{blog.title}</h2>
    <p>by {blog.author}</p>
    <AnchorButton text="Read More" href={`/blogs/${blog.id}`} />
</Card>

BlogCard.propTypes = {
    blog: PropTypes.object.isRequired
}

export default BlogCard