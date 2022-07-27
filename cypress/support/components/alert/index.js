import { el } from './elements'

class Alert {
    haveText(expectdText) {
        cy.contains(el.Error, expectdText)
            .should('be.visible')
    }
}

export default new Alert()