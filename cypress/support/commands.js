Cypress.Commands.add("login", ({ username, password }) => {
    cy.request("POST", "http://localhost:3002/api/login", { username, password })
        .then(({ body }) => {
            localStorage.setItem("user", JSON.stringify(body))
            cy.visit("http://localhost:3000")
        })
})

Cypress.Commands.add("newBlog", ({ title, author, url }) => {
    cy.request({
        url: "http://localhost:3002/api/blogs",
        method: "POST",
        body: { title, author, url },
        headers: { "Authorization": JSON.parse(localStorage.getItem("user")).token }
    })
    cy.visit("http://localhost:3000")
})