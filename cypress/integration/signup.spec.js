// para utilizar em sistemais mais antigos (PHP, Java, etc)

//https://www.npmjs.com/
// instalar com yarn: yarn add pg -D

import signup from '../support/pages/signup'
import signupPage from '../support/pages/signup'

describe('Cadastro', function () {
    context('quando o usuario é novato', function () {
        const user = {
            name: 'Fernanda Gamarano',
            email: 'fgamarano@samuraibs.com',
            password: 'q1w2e3'
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })
        it('Deve cadastrar um novo usuario', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })

    context('quando o email já existe', function () {
        const user = {
            name: 'Felipe',
            email: 'felipe@samuraibs.com',
            password: 'qwe123',
            is_provider: true
        }

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

        it('Deve exibir email já cadastrado', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })
    })

    context('Quando o email é inválido', function () {
        const user = {
            name: 'Camila Ferreira',
            email: 'caah.yahoo.com',
            password: 'qwe123',
        }

        it('Deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')
        })
    })

    context('Quando a senga tem menos de 6 caracteres', function () {

        const passwords = ['1', '2a', '3ab', '4abc', '5abcz']

        beforeEach(function () {
            signupPage.go()
        })

        passwords.forEach(function (p) {
            it('Não deve cadastrar com a senha ' + p, function () {

                const user = { name: 'Jason Friday', email: 'jason@yahoo.com', password: p }

                signupPage.form(user)
                signupPage.submit()
            })
        })

        afterEach(function () {
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })
    })
})



  