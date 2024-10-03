describe('My First Test', () => {
  it('Visits the app and checks the title', () => {
    cy.visit('/')
    cy.contains('Welcome to My App')
  })
})
