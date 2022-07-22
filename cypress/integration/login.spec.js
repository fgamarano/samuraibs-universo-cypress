import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('login', function () {

    context('Quando o usario é muito bom', function () {

        const user = {name: 'Fernanda Gamarano', email: 'fgamarano@samuraibs.com', password: 'q1w2e3'}

        it('Deve logar com sucesso',function (){
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)
        })
    })
})