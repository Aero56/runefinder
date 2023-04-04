describe('ui: Ui component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=button--primary'));

  it('should render the component', () => {
    cy.get('button').should('contain', 'Button');
  });
});
