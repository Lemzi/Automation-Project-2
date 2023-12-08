describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        BeforeEachTest();
        });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const getCommentBacklog = () => cy.get('[data-testid="issue-comment"]');

    it('Should create, edit and delete a comment successfully', () => {
        const comment = 'TEST COMMENT';
        const previousComment = 'An old silent pond...';
        const editedcomment = 'TEST_COMMENT_EDITED';
        
        //Adding a comment
        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...')
                .click();

            cy.get('textarea[placeholder="Add a comment..."]').type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.contains('Add a comment...').should('exist');
            getCommentBacklog().should('contain', comment);
        });
        //Editing a comment
        getIssueDetailsModal().within(() => {
            getCommentBacklog()
                .eq(1)
                .contains('Edit')
                .click()
                .should('not.exist');

            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain', previousComment)
                .clear()
                .type(editedcomment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

                getCommentBacklog()
                .should('contain', 'Edit')
                .and('contain', editedcomment);
        });
        //Deleting a comment
        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .contains('Delete')
            .click();

        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment') 
            .click()
            .should('not.exist');

        getIssueDetailsModal()
        .find('[data-testid="issue-comment"]')
        .contains(comment)
        .should('not.exist');
    });
});

function BeforeEachTest(){
    //Creating an extra constant for the function itself
    const issueTitle = 'This is an issue of type: Task.';
    cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      //open issue detail modal with title from line 16  
      cy.contains(issueTitle).click();
    });
    }