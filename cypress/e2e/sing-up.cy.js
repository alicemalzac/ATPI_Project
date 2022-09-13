
describe('Test cases of Sing up/ Register', () => {
  beforeEach(() => {
   cy.visit('/')
   cy.generateData()
  });
  it('Successfully register', () => {
    //Arrange
    cy.intercept({
      method: 'POST',
      hostname: 'api.realworld.io',
      path: '/api/users',
    }).as('postUsers')

    cy.fixture('data.json').then((user) => {
      cy.get('[ui-sref="app.register"]')
        .should('be.visible') //assert
        .click();
      cy.get('[placeholder="Username"]')
        .should('be.visible') //assert
        .type(user.username);
      cy.get('[placeholder="Email"]')
        .should('be.visible') //assert
        .type(user.email);
      cy.get('[placeholder="Password"]')
        .should('be.visible') //assert
        .type(user.password);  
      cy.get("form[ng-submit]").submit();

    //Assert
      cy.contains('Your Feed').should('be.visible')
      cy.get(':nth-child(4) > .nav-link').should('contain', user.username)
    })

    cy.wait('@postUsers').then( interceptions => {
      expect(interceptions.response.statusCode).to.be.eq(200)
      expect(interceptions.response.body.user.token).to.not.be.empty
    })
  })  
  it('Username field cant be empty', () => {
    //Act
    cy.fixture('data.json').then((user) => {
    cy.get('[ui-sref="app.register"]')
      .should('be.visible') //assert
      .click();
    cy.get('[placeholder="Username"]')
      .should('be.visible') //assert
    cy.get('[placeholder="Email"]')
      .should('be.visible') //assert
      .type(user.email);
    cy.get('[placeholder="Password"]')
      .should('be.visible') //assert
      .type(user.password);
    cy.get("form[ng-submit]").submit();
    })
    //Assert
    cy.contains("username can't be blank").should('be.visible')
  })
  it('Email field cant be empty', () => {

    //Act
    cy.fixture('data.json').then((user) => {
    cy.get('[ui-sref="app.register"]')
      .should('be.visible') //assert
      .click();
    cy.get('[placeholder="Username"]')
      .should('be.visible') //assert
      .type(user.username);
    cy.get('[placeholder="Email"]')
      .should('be.visible') //assert
    cy.get('[placeholder="Password"]')
      .should('be.visible') //assert
      .type(user.password);
    cy.get("form[ng-submit]").submit();
    })
    //Assert
    cy.contains("email can't be blank").should('be.visible')
  })
  it('Password field cant be empty', () => {

    cy.fixture('data.json').then((user) => {
    cy.get('[ui-sref="app.register"]')
      .should('be.visible') //assert
      .click();
    cy.get('[placeholder="Username"]')
      .should('be.visible') //assert
      .type(user.username);
    cy.get('[placeholder="Email"]')
      .should('be.visible') //assert
      .type(user.email);
    cy.get('[placeholder="Password"]')
      .should('be.visible') //assert
    cy.get("form[ng-submit]").submit();
    })
    //Assert
    cy.contains("password can't be blank").should('be.visible')
  })
  it('Username already been taken', () => {
    cy.fixture('data.json').then((user) => {
    cy.get('[ui-sref="app.register"]')
      .should('be.visible') //assert
      .click();
    cy.get('[placeholder="Username"]')
      .should('be.visible') //assert
      .type("aaaa");
    cy.get('[placeholder="Email"]')
      .should('be.visible') //assert
      .type(user.email);
      cy.get('[placeholder="Password"]')
      .should('be.visible') //assert
      .type(user.password);
    cy.get("form[ng-submit]").submit();
    })
    //Assert
    cy.contains("username has already been taken").should('be.visible')
  })
  it('Email already been taken', () => {
    cy.fixture('data.json').then((user) => {
    cy.get('[ui-sref="app.register"]')
      .should('be.visible') //assert
      .click();
    cy.get('[placeholder="Username"]')
      .should('be.visible') //assert
      .type(user.username);
    cy.get('[placeholder="Email"]')
      .should('be.visible') //assert
      .type("aaaa@Aaaa.com");
      cy.get('[placeholder="Password"]')
      .should('be.visible') //assert
      .type(user.password);
    cy.get("form[ng-submit]").submit();
    })
    //Assert
    cy.contains("email has already been taken").should('be.visible')
  })
  it('Email validation', () => {
    cy.fixture('data.json').then((user) => {
    cy.get('[ui-sref="app.register"]')
      .should('be.visible') //assert
      .click();
    cy.get('[placeholder="Username"]')
      .should('be.visible') //assert
      .type(user.username);
    cy.get('[placeholder="Email"]')
      .should('be.visible') //assert
      .type("aaaa@Aaaa.com");
      cy.get('[placeholder="Password"]')
      .should('be.visible') //assert
      .type(user.password);
    cy.get("form[ng-submit]").submit();
    })
    //Assert
    cy.contains("email has already been taken").should('be.visible')
  })
})