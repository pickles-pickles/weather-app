describe('test routing', () => {
  it('should route', () => {
    cy.visit('http://localhost:3000')

    cy.window().then(win => {
      if (win.store) {
        console.log(win.store.getState())
      }
    })

    /* HOME */
    cy.get('a')
      .contains('Home')
      .click()
    cy.location().should('match', /\/$/)
    cy.contains('h3', 'Weather for')

    /* SETTINGS */
    cy.get('a')
      .contains(/settings/i)
      .click()
    cy.location().should('match', /\/settings$/)
    cy.contains('h1', /settings/i)

    /* DETAILS */
    cy.get('a')
      .contains(/details$/i)
      .click()
    cy.location().should('match', /\/details$/)
    cy.contains('h1', /details/i)
  })
})
