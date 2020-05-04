import React from "react"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { createBlog } from "../reducers/blogReducer"
import { FormGroup, InputGroup, Button } from "@blueprintjs/core"

const NewBlogForm = () => {
    const dispatch = useDispatch()

    const handleNewBlog = event => {
        event.preventDefault()
        event.persist()
        const blog = {
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value
        }
        dispatch(createBlog(blog)).then(_ => {
            dispatch(setNotification(`A new blog ${blog.title} has been added.`, "SUCCESS"))
            event.target.reset()
        }).catch(err => dispatch(setNotification(err.response.data.error, "ERROR")))
    }

    return <div>
        <h2 style={{ marginTop: 0 }}>Create new entry</h2>
        <form id="newBlogForm" onSubmit={handleNewBlog}>
            <FormGroup label="Title" labelFor="newBlogTitle" labelInfo="(required)">
                <InputGroup name="title" id="newBlogTitle" placeholder="An interesting article" />
            </FormGroup>
            <FormGroup label="Author" labelFor="newBlogAuthor" labelInfo="(required)">
                <InputGroup name="author" id="newBlogAuthor" placeholder="John Smith" />
            </FormGroup>
            <FormGroup label="URL" labelFor="newBlogURL" labelInfo="(required)">
                <InputGroup name="url" id="newBlogURL" placeholder="www.example.com" />
            </FormGroup>
            <Button className="bp3-intent-primary" icon="add" text="Add" type="submit" />
        </form>
    </div>
}

export default NewBlogForm