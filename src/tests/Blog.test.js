import React from "react"
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import Blog from "../components/Blog"

describe("<Blog />", () => {
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
    const deleteBlog = jest.fn()

    let component

    beforeEach(() => {
        component = render(<Blog blog={blog} deleteBlog={deleteBlog} />)
    })

    test("Initially only title and author are visible", () => {
        expect(component.container.querySelector(".blogTitle")).toBeVisible()
        expect(component.container.querySelector(".blogAuthor")).toBeVisible()
        expect(component.container.querySelector(".blogURL")).not.toBeVisible()
        expect(component.container.querySelector(".blogLikes")).not.toBeVisible()
    })
})