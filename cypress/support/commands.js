Cypress.Commands.add('generateData', () => {
    const faker = require('faker-br');
  
    cy.writeFile('cypress/fixtures/data.json', () => {
        return {
          'username':`${faker.internet.userName()}`,
          'email':`${faker.internet.email()}`,
          'password':`${faker.internet.password()}`,
        }
    })
  })