/// <reference types="cypress" />

describe("Blog app", () => {
    beforeEach(() => {
        cy.request("POST", "http://localhost:3002/api/testing/reset") // Reset database
        cy.request("POST", "http://localhost:3002/api/users", { //Create test user
            name: "test",
            username: "user",
            password: "pass"
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
    })
})