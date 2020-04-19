/// <reference types="cypress" />

describe("Blog app", () => {
    beforeEach(() => {
        cy.request("POST", "http://localhost:3002/api/testing/reset") // Reset database
        cy.request("POST", "http://localhost:3002/api/users", { //Create test user
            name: "test",
            username: "user",
            password: "pass"
        })
        cy.request("POST", "http://localhost:3002/api/users", { //Create another test user
            name: "test2",
            username: "user2",
            password: "pass2"
        })
        cy.visit("http://localhost:3000")
    })

    it("Login form is shown", () => {
        cy.contains("login").click()
        cy.get("#loginForm").should("be.visible")
    })

    describe("Login", () => {
        it("Succeeds with correct credentials", () => {
            cy.contains("login").click()
            cy.get("#loginFormUsername").type("user")
            cy.get("#loginFormPassword").type("pass")
            cy.get("#loginForm").submit()
            cy.contains("Hi test!")
        })

        it("Fails with wrong credentials", () => {
            cy.contains("login").click()
            cy.get("#loginFormUsername").type("admin")
            cy.get("#loginFormPassword").type("admin")
            cy.get("#loginForm").submit()
            cy.get("#notificationMessage").should("be.visible").contains("Wrong credentials")
        })
    })

    describe("When logged in", () => {
        beforeEach(() => {
            cy.login({ username: "user", password: "pass" })
        })

        it("A blog can be created", () => {
            cy.contains("create").click()
            cy.get("#newBlogTitle").type("My title")
            cy.get("#newBlogAuthor").type("John Doe")
            cy.get("#newBlogURL").type("google.com")
            cy.get("#newBlogForm").submit()
            cy.get("#notificationMessage").contains("A new blog My title has been added.")
            cy.get(".blogTitle").contains("My title")
            cy.get(".blogAuthor").contains("John Doe")
        })

        it("A blog can be liked", () => {
            cy.newBlog({ title: "Like this please", author: "John Doe", url: "bing.com" })
            cy.contains("view").click()
            cy.get(".blogLikes").should("contain", "0")
            cy.get("button").click()
            cy.get(".blogLikes").should("contain", "1")
        })

        it("User who created a blog can delete it", () => {
            cy.newBlog({ title: "Blog saved by user", author: "John Doe", url: "google.com" })
            cy.contains("view").click()
            cy.contains("delete").click()
            cy.get("#notificationMessage").should("contain", "Blog saved by user has been deleted")
            cy.get(".blogTitle").should("not.exist")
        })

        it("Other users cannot delete others' blogs", () => {
            cy.newBlog({ title: "Blog saved by user", author: "John Doe", url: "google.com" })
            cy.contains("logout").click()
            cy.login({ username: "user2", password: "pass2" })
            cy.contains("view").click()
            cy.contains("delete").should("not.exist")
        })
    })

    it("Blogs are displayed in order of likes", () => {
        cy.login({ username: "user", password: "pass" })
        cy.newBlog({ title: "Blog with 0 likes", author: "someone", url: "google.com" })

        cy.newBlog({ title: "Blog with 1 likes", author: "someone", url: "google.com" })
        cy.contains("Blog with 1 likes").parent().contains("view").click()
        cy.contains("Blog with 1 likes").parent().find("#blogLikeButton").click()

        cy.newBlog({ title: "Blog with 2 likes", author: "someone", url: "google.com" })
        cy.contains("Blog with 2 likes").parent().contains("view").click()
        cy.contains("Blog with 2 likes").parent().find("#blogLikeButton").click().click()

        cy.newBlog({ title: "Blog with 3 likes", author: "someone", url: "google.com" })
        cy.contains("Blog with 3 likes").parent().contains("view").click()
        cy.contains("Blog with 3 likes").parent().find("#blogLikeButton").click().click().click()

        let likes = 3

        cy.get(".blog").each((el, index, list) => {
            cy.wrap(el).find(".blogTitle").should("contain", likes)
            likes-=1
        })
    })
})