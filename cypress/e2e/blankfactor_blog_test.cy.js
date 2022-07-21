describe('Blank Factor Automation coding challenge', () => {
  it('Passes the chanllenge', () => {

    //1. we visit the http type url and not https as was requested in the challeng and the the app redirects automatically to https domain.
    cy.visit('http://blankfactor.com')
    //we have to accept the cookies pop-up if we want to interact witht the webpage
    cy.get('[id="hs-eu-confirmation-button"]').click()
    //2. navigating to blog section
    cy.get('[id="menu-item-4436"]').trigger('mouseover')
    cy.get('a>[href="https://blankfactor.com/insights/blog/"]').click()
    //3. scrolling down until finding the article as requested in the challenge
    function deployArticles(){
      for(let n = 0; n < 18; n ++){
        cy.get('.load-more-btn-wrap > .btn',{ log: false }).click({ log: false })
        //cy.wait(1)
      }
    }
    deployArticles()
    cy.get('[data-id="4018"]').click()

    //4. validating we're in the right package
    //with url
    cy.url().should('eq','https://blankfactor.com/insights/blog/fintech-in-latin-america/')
    //with some text
    cy.get('.heading-3').should('have.text',' Why Fintech in Latin America Is Having a Boom')
    //5. subscribe to the newsletter
    cy.get('[type="email"]').type('challengesmasher@blankfactor.com')
    cy.get('#form-newsletter-blog-submit-btn').click()
    //confirming we suscribed successfully
    cy.get('.mc4wp-response').should('have.text','Thank you for subscribing! Stay tuned.')
    //6. going back to blog section/page
    cy.go('back')
    deployArticles()
    //Printing the list of titles and links from all articles 
    //(This could be optimal if we do it the first time we executed deployArticles, but, just following the steps in the challenge)
    cy.get('.post-template__info > h2.heading-4.post-title a').each(($el, index, $list)=>{
      var text = $el.text()
      cy.log(`${text}: ${$el.attr('href')}`)
    })
    
  })
})