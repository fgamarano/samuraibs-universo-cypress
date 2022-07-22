// importar a biblioteca fake instalada, documentação a baixo

// import { faker } from '@faker-js/faker'


it('Deve cadastrar um novo usuario', function () {

    const nome = 'Fernanda Gamarano'
    // const email = faker.internet.email()
    const email = 'fgamarano@samuraibs.com'
    const senha = 'q1w2e3'

    cy.visit('/signup')

    // placeholder é a descrição do campo (Deixa claro qual o tipo da entrada de dados).

    cy.get('input[placeholder="Nome"]').type(nome)
    cy.get('input[placeholder="E-mail"]').type(email)
    cy.get('input[placeholder="Senha"]').type(senha)

    // o cypress está ouvindo o tipo de requisição post e quando feita o cypress pode mudar o codigo de retorno.
    cy.intercept('POST', '/users', {
        statusCode: 200
    }).as('postUser')
    

    cy.contains('button', 'Cadastrar').click()

    cy.wait('@postUser')

    // eu uso o @ para chamar o alisas (função as)

    // classe toast

    cy.get('.toast')
        .should('be.visible')
        .find('p') 
        .should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!')

        //busco o paragrafo dentro do toast (quadradinho do lado).

        // adicionar biblioteca fake
        // yarn add @faker-js/faker -D
        // https://fakerjs.dev/guide/

})