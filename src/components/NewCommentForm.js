import React from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import blogService from "../services/blogs"
import { updateBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"
import { FormGroup, Button, TextArea } from "@blueprintjs/core"

const NewCommentForm = () => {
    const id = useParams().id
    const dispatch = useDispatch()

    const handleSubmit = event => {
        event.preventDefault()
        event.persist()
        blogService.comment(id, event.target.comment.value)
            .then(blog => dispatch(updateBlog(blog)))
            .then(_ => event.target.reset())
            .catch(err => dispatch(setNotification("Comment cannot be empty")))
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <FormGroup labelFor="comment">
                <TextArea style={{ width: "60%" }} id="comment" name="comment" placeholder="Leave a comment. E.g. Thanks for sharing this article!" />
            </FormGroup>
            <Button icon="chat" text="Comment" type="submit" />
        </form>
    </div>
}

export default NewCommentForm