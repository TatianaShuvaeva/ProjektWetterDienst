describe('Happy Path', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5000');
    });


    it('das Wetter für die Stadt anzeigt', () => {
        cy.wait(5000);
        cy.get('[data-cy="stadt-eingeben"]').type('Potsdam');
        cy.pause();
        cy.get('[data-cy="wetter-abfragen" ]').click();

        cy.get('[data-cy="temperatur"]').should('not.be.empty');
        cy.get('[data-cy="min-temperatur"]').should('not.be.empty');
        cy.get('[data-cy="max-temperatur"]').should('not.be.empty');
        cy.get('[data-cy="windgeschwindigkeit"]').should('not.be.empty');
        cy.get('[data-cy="luftfeuchtigkeit"]').should('not.be.empty');
        cy.get('[data-cy="sonnenaufgang"]').should('not.be.empty');
        cy.get('[data-cy="sonnenuntergang"]').should('not.be.empty');
    });



})


