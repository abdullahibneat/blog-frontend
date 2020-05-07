import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import blogService from "../services/blogs"
import { updateBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"
import { FormGroup, Button, TextArea } from "@blueprintjs/core"

const NewCommentForm = () => {
    const [disabled, setDisabled] = useState(false)
    const id = useParams().id
    const dispatch = useDispatch()

    const handleSubmit = event => {
        event.preventDefault()
        event.persist()
        setDisabled(true)
        blogService.comment(id, event.target.comment.value)
            .then(blog => dispatch(updateBlog(blog)))
            .then(_ => event.target.reset())
            .catch(err => dispatch(setNotification("Comment cannot be empty", "ERROR")))
            .finally(() => setDisabled(false))
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <FormGroup labelFor="comment">
                <TextArea disabled={disabled} id="comment" name="comment" placeholder="Leave a comment. E.g. Thanks for sharing this article!" />
            </FormGroup>
            <Button loading={disabled} icon="chat" text="Comment" type="submit" />
        </form>
    </div>
}

export default NewCommentForm