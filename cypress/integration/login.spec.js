import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'
import login from '../support/pages/login'

describe('login', function () {

    context('Quando o usario é muito bom', function () {

        const user = {
            name: 'Fernanda Gamarano',
            email: 'fgamarano@samuraibs.com',
            password: 'q1w2e3',
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
        })

        it('Deve logar com sucesso', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)
        })
    })

    context('Quando o usuario é bom, mas a senha é invalida', function () {

        let user = {
            name: 'Camila kamura',
            email: "kamura@samuraibs.com",
            password: 'pwd123',
            is_provider: true
        }

        // const é imutavel
        //let é uma variavel que eu consigo alterar

        before(function () {
            cy.postUser(user).then(function () {
                user.password = 'abc123'
            })
            // é usado o then, para alterar a senha, pois primeiro o usuario é cadastrado
            // e após o cadastro a senha é alterada.
        })

        it('Deve notificar erro de credenciais', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.toast.shouldHaveText(message)
        })
    })

    context('Quando o formato do email é inválido', function (){

        const emails = [
            'papito.com.br',
            'yahoo.com',
            '@gmail.com',
            '1111'
        ]

        before(function(){
            loginPage.go()
            // para acessar a pagina uma unica vez para todos os tests
        })

        emails.forEach (function (email){
            it('Não deve logar com o email: ' + email, function (){
                const user = {email: email, password: 'pdd123'}

                loginPage.form(user)
                loginPage.submit()
                loginPage.alert.haveText('Informe um email válido')
            })
        })
    })
    
     context('quando não preencho nenhum dos campos', function(){
        const alertMessages = [
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function(){
            loginPage.go()
            loginPage.submit()
        })

        alertMessages.forEach(function(alert){
            it('deve exibir ' + alert.toLowerCase(), function(){
                loginPage.alert.haveText(alert)
            })
        })
    })
})
