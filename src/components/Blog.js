import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { deleteBlog, updateBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"
import { useParams, useHistory } from "react-router-dom"
import NewCommentForm from "./NewCommentForm"
import { Tag, AnchorButton, Alert, Intent, Callout, Icon, Spinner } from "@blueprintjs/core"

const Blog = () => {
    const [isOpen, setOpen] = useState(false)
    const [isLoading, setLoading] = useState(true)

    const id = useParams().id
    const blog = useSelector(state => state.blogs)
        .find(b => b.id === id)

    // Show spinner for up to 5 seconds while finding blog
    if(!blog) setTimeout(() => {
        setLoading(false)
    }, 5000)

    const dispatch = useDispatch()
    const history = useHistory()

    const username = useSelector(state => state.user? state.user.name : null)

    const handleLike = () => {
        blog.likes = blog.likes + 1
        dispatch(updateBlog(blog))
    }

    const handleDelete = () => {
        dispatch(deleteBlog(blog))
        dispatch(setNotification(`${blog.title} has been deleted`, "SUCCESS"))
        history.push("/blogs")
    }

    return blog
        ? <div className="blog">
            <h1 className="blogTitle">{blog.title}</h1>
            <p>by <span className="blogAuthor"><b>{blog.author}</b></span></p>
            <p><a className="blogURL" href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></p>
            <Tag className="blogLikes" large={true} minimal={true} interactive={true} onClick={handleLike} rightIcon="heart">{blog.likes} likes</Tag>
            <p style={{ marginTop: "1em" }}>Saved by <Icon icon="user"/> {blog.user.name}</p>
            {username === blog.user.name ? <AnchorButton className="bp3-intent-danger" text="Delete" onClick={() => setOpen(true)}/> : null}

            <Alert isOpen={isOpen} cancelButtonText="Cancel" confirmButtonText="Delete" icon="trash"
                intent={Intent.DANGER} onCancel={() => setOpen(false)} onConfirm={handleDelete}>
                    <p>Are you sure you want to delete this blog? This action
                        cannot be undone.
                    </p>
            </Alert>

            <h4>Commnets</h4>
            <NewCommentForm />
            {blog.comments.length > 0
            ? <div>
                {blog.comments.map(c =>
                    <Callout style={{ width: "fit-content", margin: "1em 0" }} key={c.id}>{c.comment}</Callout>
                )}
            </div>
            : <p style={{ marginTop: "1em" }}>Be the first to leave a comment!</p>}
        </div>
        : isLoading
            ? <Spinner />
            : <h4>Blog not found</h4>
}

export default Blog
