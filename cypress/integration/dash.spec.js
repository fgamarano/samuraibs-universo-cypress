import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('Dashboard', function () {

    context('Quando o cliente faz um agendamento no app mobile', function () {

        const data = {
            customer: {
                name: 'Nikki Sixx',
                email: 'sixx@motleycrue.com',
                password: 'pwd123',
                is_provider: false
            },
            provider: {
                name: 'Ramon Valdes',
                email: 'rvaldes@samuraibs.com',
                password: 'pwd123',
                is_provider: true
            },
            appointmentHour: '14:00'
        }

        before(function () {
            cy.postUser(data.provider)
            cy.postUser(data.customer)
            
            cy.apiLogin(data.customer)
            cy.log('Conseguimos pegar o token ' + Cypress.env('apiToken'))

            cy.setProviderId(data.provider.email)
            cy.createAppointment(data.appointmentHour)
        })

        it('O mesmo deve ser exibido no dashboard', function () {

            loginPage.go()
            loginPage.form(data.provider)
            loginPage.submit()

            dashPage.calendarShouldBeVisible()

            const day = Cypress.env('appointmentDay')
            dashPage.selectDay(day)
            dashPage.appointmentShouldBe(data.customer, data.appointmentHour)
            
        })
    })
})

