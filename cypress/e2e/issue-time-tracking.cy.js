const issueDetailModal = '[data-testid="modal:issue-details"]'
const backLogList = '[data-testid="board-list:backlog"]';
const TimeField = 'input[placeholder="Number"]';
const timeTrackingModal = '[data-testid="modal:tracking"]';
const TimeTrackerButton = '[data-testid="icon:stopwatch"]';
const issueCreatedConfirmation = 'Issue has been successfully created.';
const issueTitle = 'Title5'
const issueDescription = 'This is my new test'
const estimatedValueAndText = '7h estimated';
const NoTimeLogged =()=> cy.contains('No time logged').should('be.visible');
const TimeTracking =()=> cy.contains('Time Tracking')
const TimeSpentInput =()=> cy.contains('div', 'Time spent (hours)').next('div').find('input');
const TimeRemainingInput =()=> cy.contains('div', 'Time remaining (hours)').next('div').find('input');
const HoursRemaining =()=> cy.contains('div', 'Time tracking').next('div').find('5h remaining');


describe('Time-tracking testing', () => {
    beforeEach(() => {
        OpeningNewIssueCreationWindow();
        });

        it('Should update type, status, assignees, reporter, priority successfully', () => {
            //Creating a new ticket to have time tracking in its default value ('0').
        CreatingNewTest();

        //Checking that there's no time added to the ticket by default
        NoTimeLogged();
        OriginalEstimateFieldIsEmpty();
        
        //Adding time in estimate field and removing it
        cy.get(TimeField).click('').type('7');
        cy.contains('7h estimated')
        cy.get(TimeField).clear('').contains('7h estimated').should('not.exist');

        //checking default values
        cy.get(TimeTrackerButton).click();
        cy.get(timeTrackingModal).should('be.visible');
        TimeSpentInput().should('have.value', '');

        //Inputing new values which should be visible after confirming
        TimeSpentInput().type('7');
        TimeRemainingInput().should('have.value','');
        TimeRemainingInput().type('5');
        cy.contains('7h logged');
        cy.contains('5h remaining');
        cy.contains('button', 'Done').click().should('not.exist');

        //removing estimates
        cy.get(TimeTrackerButton).click();
        cy.get(timeTrackingModal).should('be.visible');
        TimeSpentInput().clear('');
        cy.get(timeTrackingModal).contains('No time logged').should('be.visible');
        TimeRemainingInput().clear('');
        cy.get('[data-testid="modal:tracking"]').within(() => {
            cy.contains('5h remaining').should('not.exist');
        });

        //confirming no time is logged and we're back at modal screen
        cy.contains('button', 'Done').click().should('not.exist');
        cy.get(issueDetailModal).should('be.visible')
        NoTimeLogged();
    });
 });

function CreatingNewTest () {
cy.get('[data-testid="modal:issue-create"]').within(() => {
    cy.get(".ql-editor").type(issueDescription);
    cy.get('input[name="title"]').type(issueTitle);
    cy.get('[data-testid="select:type"]').click();
    cy.get('[data-testid="select-option:Story"]').click();
    cy.get('[data-testid="select:userIds"]').click();
    cy.get('[data-testid="select-option:Lord Gaben"]').click();
    cy.get('button[type="submit"]').click();
     });
     cy.contains(issueCreatedConfirmation).should('be.visible');
     cy.get(backLogList).should('be.visible').contains(issueTitle).click();
}

function OpeningNewIssueCreationWindow () {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board?modal-issue-create=true');
    });
}

function OriginalEstimateFieldIsEmpty (){
    cy.get(TimeField).should('have.value', '');
}