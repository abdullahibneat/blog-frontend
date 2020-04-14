import React from "react"
import "@testing-library/jest-dom"
import { render, fireEvent } from "@testing-library/react"
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
    const updateLikes = jest.fn()

    let component

    beforeEach(() => {
        component = render(<Blog blog={blog} deleteBlog={deleteBlog} updateLikes={updateLikes} />)
    })

    test("Initially only title and author are visible", () => {
        expect(component.container.querySelector(".blogTitle")).toBeVisible()
        expect(component.container.querySelector(".blogAuthor")).toBeVisible()
        expect(component.container.querySelector(".blogURL")).not.toBeVisible()
        expect(component.container.querySelector(".blogLikes")).not.toBeVisible()
    })

    test("After expanding a blog, URL and likes are visible", () => {
        const expandButton = component.getByText("view")
        fireEvent.click(expandButton)

        expect(component.container.querySelector(".blogURL")).toBeVisible()
        expect(component.container.querySelector(".blogLikes")).toBeVisible()
    })
})