import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import NewBlogForm from "../components/NewBlogForm"

describe("<NewNlogForm />", () => {
    let component
    const blog = {
        id: "abc",
        title: "Sample blog",
        author: "John Doe",
        url: "google.com",
        likes: 5,
        user: {
            username: "testUser"
        }
    }

    const onSubmitForm = jest.fn()

    beforeEach(() => {
        component = render(<NewBlogForm onSubmitForm={onSubmitForm} />)
    })

    test("Correct details are sent using the form", () => {
        const form = component.container.querySelector("form")
        const titleInput = component.container.querySelector("#newBlogTitle")
        const authorInput = component.container.querySelector("#newBlogAuthor")
        const urlInput = component.container.querySelector("#newBlogURL")

        fireEvent.change(titleInput, { target: { value: blog.title } })
        fireEvent.change(authorInput, { target: { value: blog.author } })
        fireEvent.change(urlInput, { target: { value: blog.url } })

        fireEvent.submit(form)

        const submittedData = onSubmitForm.mock.calls[0][0]

        expect(submittedData.title).toBe(blog.title)
        expect(submittedData.author).toBe(blog.author)
        expect(submittedData.url).toBe(blog.url)
    })
})