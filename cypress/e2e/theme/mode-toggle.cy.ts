describe("ModeToggle Component", () => {
  beforeEach(() => {
    cy.visit("/en");
  });

  it("should open the dropdown menu when the button is clicked", () => {
    cy.get('button[aria-label="Toggle theme"]').click({ force: true });
    cy.get('[aria-label="Theme modes"]').should("be.visible");
  });

  it('should display the "Light", "Dark", and "System" theme options', () => {
    cy.get('button[aria-label="Toggle theme"]').click({ force: true });
    cy.get('[aria-label="Theme modes"]').within(() => {
      cy.contains("Light").should("be.visible");
      cy.contains("Dark").should("be.visible");
      cy.contains("System").should("be.visible");
    });
  });
});
