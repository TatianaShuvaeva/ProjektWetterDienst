describe('Happy Path', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5000');
    });


    it('das Wetter für die Stadt anzeigt', () => {
        cy.wait(5000);
        cy.get('[data-cy="stadt-eingeben"]').type('Potsdam');
        cy.pause();
        cy.get('[data-cy="wetter-abfragen" ]').click();

        cy.get('[data-cy="min-temperatur"]').should('not.be.empty');
    });



})


