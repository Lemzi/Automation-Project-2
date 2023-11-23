describe('Issue task deletion', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');
      });
    });
    it.only('Test Case 1: Issue Deletion:', () => {
        //Clicking the deletion button to start deleting the task
        cy.get('[data-testid="icon:trash"]').click();

        //Confirming if the confirmation window is opened with correct text
        cy.get('[data-testid="modal:confirm"]').should('be.visible');
            cy.contains('Are you sure you want to delete this issue?').should('be.visible');
            cy.contains("Once you delete, it's gone for good.").should('be.visible');
        //Deleting the task and confirming that that the modal window has closed after confirming the deletion
        cy.contains('Delete issue').click();
        cy.get('[data-testid="modal:issue-details"]').should('not.exist');

        //Assert that the task has been deleted and does not exist in the backlog
        cy.contains('This is an issue of type: Task.').should('not.exist');
    });

    it('Test Case 2: Issue Deletion Cancellation', () => {
        //Clicking the deletion button to start deleting the task
        cy.get('[data-testid="icon:trash"]').click();

        //Confirming if the correct modal window is opened with correct text
        cy.get('[data-testid="modal:confirm"]').should('be.visible');
            cy.contains('Are you sure you want to delete this issue?').should('be.visible');
            cy.contains("Once you delete, it's gone for good.").should('be.visible');
        cy.contains('Cancel').click();
        cy.get('[data-testid="modal:confirm"]').should('not.exist');

    //Confirming that the previous modal view is visible
     cy.get('[data-testid="modal:issue-details"]').should('be.visible');

    //Closing the modal view to see if the task is still visible
    //Assert that successful message has dissappeared after the reload
    


        

});
});
