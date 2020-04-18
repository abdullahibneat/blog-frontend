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
            cy.get("#notificaitonMessage").should("be.visible").contains("Wrong credentials")
        })
    })
})