import fpPage from '../support/pages/forgotpass'
import rpPage from '../support/pages/resetpass'

describe('Recuperação de senha', function () {

    before(function () {
        cy.fixture('recovery').then(function (recovery) {
            this.data = recovery
        })
    })

    context('Quando o usuario esque a senha', function () {

        before(function () {
            cy.postUser(this.data)
        })

        it('Deve resgatar a senha por email', function () {

            fpPage.go()
            fpPage.form(this.data.email)
            fpPage.submit()
            fpPage.toast.shouldHaveText('Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.')

        })
    })

    context('Quando o usuario solicita a recuperação da senha', function () {

        before(function () {
            cy.postUser(this.data)
            cy.recoveryPass(this.data.email)
        })

        it('Deve poder cadastrar uma nova senha', function () {

            const token = Cypress.env('recoveryToken')

            rpPage.go(token)
            rpPage.form('abc123', 'abc123')
            rpPage.submit()
            rpPage.toast.shouldHaveText('Agora você já pode logar com a sua nova senha secreta.')
        })
    })

})