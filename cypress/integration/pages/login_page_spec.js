describe('Login page', function() {
  it('should be redirected to the login page', function() {
    cy
      .visit('/')
      .url().should('contain', '/login')
  })
});
