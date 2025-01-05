describe('Negativtests', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5000');
    });


    it('Fehlermeldung über eine falsch eingegebene Stadt', () => {
        cy.wait(2000);
        cy.get('[data-cy="stadt-eingeben"]').type('Patsdam222');

        cy.wait(2000);
        cy.get('[data-cy="wetter-abfragen" ]').click();

        cy.wait(2000);
        
        cy.get('#weatherInfo').should('be.visible');
        cy.get('#weatherInfo').should('have.text', 'Fehler beim Abrufen der Daten');

        cy.get('#weatherChartError').should('be.visible');
        cy.get('#weatherChartError').should('have.text', 'Fehler beim Abrufen der Wettervorhersage');
    });

    it('Fehlermeldung über eine nicht eingegebene Stadt', () => {
       
        cy.wait(2000);
        cy.get('[data-cy="wetter-abfragen" ]').click();

        cy.wait(2000);
        cy.get('#weatherInfo').should('be.visible');
        cy.get('#weatherInfo').should('have.text', 'Bitte geben Sie eine Stadt ein');
    });
})
