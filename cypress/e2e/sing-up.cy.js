describe('Test cases of Sing up/ Register', () => {
  beforeEach(() => {
   cy.visit('https://demo.realworld.io/#/')
  });
  it('Successfully register', () => {
    //Arrange
    const faker = require('faker-br');
    const username = faker.internet.userName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    //Act
    cy.get('[ui-sref="app.register"]')
      .should('be.visible') //assert
      .click();
    cy.get('[placeholder="Username"]')
      .should('be.visible') //assert
      .type(username);
    cy.get('[placeholder="Email"]')
      .should('be.visible') //assert
      .type(email);
    cy.get('[placeholder="Password"]')
      .should('be.visible') //assert
      .type(password);
    cy.get("form[ng-submit]").submit();

    //Assert
    cy.contains('Your Feed').should('be.visible')
    cy.get(':nth-child(4) > .nav-link').should('contain', username)
  })
  it('Username field cant be empty', () => {
    //Arrange
    const faker = require('faker-br');
    const email = faker.internet.email()
    const password = faker.internet.password()

    //Act
    cy.get('[ui-sref="app.register"]')
      .should('be.visible') //assert
      .click();
    cy.get('[placeholder="Username"]')
      .should('be.visible') //assert
    cy.get('[placeholder="Email"]')
      .should('be.visible') //assert
      .type(email);
    cy.get('[placeholder="Password"]')
      .should('be.visible') //assert
      .type(password);
    cy.get("form[ng-submit]").submit();

    //Assert
    cy.contains("username can't be blank").should('be.visible')
  })
  it('Email field cant be empty', () => {
    //Arrange
    const faker = require('faker-br');
    const username = faker.internet.userName()
    const password = faker.internet.password()

    //Act
    cy.get('[ui-sref="app.register"]')
      .should('be.visible') //assert
      .click();
    cy.get('[placeholder="Username"]')
      .should('be.visible') //assert
      .type(username);
    cy.get('[placeholder="Email"]')
      .should('be.visible') //assert
    cy.get('[placeholder="Password"]')
      .should('be.visible') //assert
      .type(password);
    cy.get("form[ng-submit]").submit();

    //Assert
    cy.contains("email can't be blank").should('be.visible')
  })
  it('Password field cant be empty', () => {
    //Arrange
    const faker = require('faker-br');
    const username = faker.internet.userName()
    const email = faker.internet.email()

    //Act
    cy.get('[ui-sref="app.register"]')
      .should('be.visible') //assert
      .click();
    cy.get('[placeholder="Username"]')
      .should('be.visible') //assert
      .type(username);
    cy.get('[placeholder="Email"]')
      .should('be.visible') //assert
      .type(email);
    cy.get('[placeholder="Password"]')
      .should('be.visible') //assert
    cy.get("form[ng-submit]").submit();

    //Assert
    cy.contains("password can't be blank").should('be.visible')
  })
})