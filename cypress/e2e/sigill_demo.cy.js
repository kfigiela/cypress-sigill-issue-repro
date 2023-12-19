import dayjs from 'dayjs';

Cypress.on('uncaught:exception', (_err, _runnable) => {
    return false;
});

const checkIn = dayjs().add(1, 'month').startOf('month').add(4, 'days').format('YYYY-MM-DD');
const checkOut = dayjs().add(1, 'month').startOf('month').add(8, 'days').format('YYYY-MM-DD');
describe('foo bar baz', () => {
    it('xyz xyz xyz', () => {
        cy.visit(`https://www.mgmresorts.com/book-room?region=las-vegas&resort=las-vegas&checkIn=${checkIn}&checkOut=${checkOut}&guests=2`);
        cy.setCookie('OptanonAlertBoxClosed', (new Date).toISOString());

        cy.get('[data-testid="ResortCard:Bellagio Hotel & Casino"]').click();
        cy.url().should('include', 'resort=44e610ab-c209-4232-8bb4-51f7b9b13a75');

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000); // Wait extra to prevent race condition
        cy.get('[data-testid="FixedButton:Next"] button').click();

        cy.window().its('digitalData.reservation.roomPrograms').should('not.be.empty');
        // it will fail somewhere here (after navigation)
        cy.get('#jwbModalInput').should('be.visible');
    });
});
