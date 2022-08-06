import { el } from './elements'
import toast from '../../components/toast'

class ResetPassPage {

    constructor() {
        this.toast = toast
    }

    go(token) {
        cy.visit('/reset-password?token=' + token)

    }

    form(newPass, confPass) {
        cy.get(el.newpass)
            .clear()
            .type(newPass)
        
        cy.get(el.confpass)
            .clear()
            .type(confPass)
    }

    submit(){
        cy.contains(el.changepass).click()
    }
}

export default new ResetPassPage