import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('login', function () {

    context('Quando o usario é muito bom', function () {

        const user = { name: 'Fernanda Gamarano', email: 'fgamarano@samuraibs.com', password: 'q1w2e3', is_provider: true}

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })
        })
        it('Deve logar com sucesso', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)
        })
    })
})