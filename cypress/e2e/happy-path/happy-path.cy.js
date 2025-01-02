describe('Happy Path', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5000');
    });


    it('das Wetter für die Stadt anzeigt', () => {
        cy.wait(2000);
        cy.get('[data-cy="stadt-eingeben"]').type('München');

        cy.wait(2000);
        cy.get('[data-cy="wetter-abfragen" ]').click();

        cy.get('[data-cy="temperatur"]').should('not.be.empty');
        cy.get('[data-cy="min-temperatur"]').should('not.be.empty');
        cy.get('[data-cy="max-temperatur"]').should('not.be.empty');
        cy.get('[data-cy="windgeschwindigkeit"]').should('not.be.empty');
        cy.get('[data-cy="luftfeuchtigkeit"]').should('not.be.empty');
        cy.get('[data-cy="sonnenaufgang"]').should('not.be.empty');
        cy.get('[data-cy="sonnenuntergang"]').should('not.be.empty');

        cy.wait(2000);
        cy.get('#weatherChart').scrollIntoView();
        cy.get('#weatherChart').should('be.visible');
    });

    it('das Wetter für die Stadt mit umlaut anzeigt', () => {
        cy.wait(2000);
        cy.get('[data-cy="stadt-eingeben"]').type('Muenchen');

        cy.wait(2000);
        cy.get('[data-cy="wetter-abfragen" ]').click();

        cy.get('[data-cy="temperatur"]').should('not.be.empty');
        cy.get('[data-cy="min-temperatur"]').should('not.be.empty');
        cy.get('[data-cy="max-temperatur"]').should('not.be.empty');
        cy.get('[data-cy="windgeschwindigkeit"]').should('not.be.empty');
        cy.get('[data-cy="luftfeuchtigkeit"]').should('not.be.empty');
        cy.get('[data-cy="sonnenaufgang"]').should('not.be.empty');
        cy.get('[data-cy="sonnenuntergang"]').should('not.be.empty');

        cy.wait(2000);
        cy.get('#weatherChart').scrollIntoView();
        cy.get('#weatherChart').should('be.visible');
    });
})


