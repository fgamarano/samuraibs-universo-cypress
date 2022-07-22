
it ('webapp deve está online', function(){
    cy.visit('/')
    
    cy.title()
    .should('eq', 'Samurai Barbershop by QAninja')
})
