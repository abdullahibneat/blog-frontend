/// <reference types="cypress" />

describe("Blog app", () => {
    beforeEach(() => {
        cy.request("POST", "http://localhost:3002/api/testing/reset")
        cy.visit("http://localhost:3000")
    })

    it("Login form is shown", () => {
        cy.contains("login").click()
        cy.get("#loginForm").should("be.visible")
    })
})