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

  it('should change to the "Light" theme when the Light option is clicked', () => {
    cy.get('button[aria-label="Toggle theme"]').click({ force: true });
    cy.contains("Light").click({ force: true });
    cy.get("p.fixed").invoke("css", "display", "none");
    cy.get('svg[aria-hidden="true"]').first().should("be.visible");
    cy.get('svg[aria-hidden="true"]').last().should("not.be.visible");
  });

  it('should change to the "Dark" theme when the Dark option is clicked', () => {
    cy.get('button[aria-label="Toggle theme"]').click({ force: true });
    cy.contains("Dark").click({ force: true });
    cy.get("p.fixed").invoke("css", "display", "none");
    cy.get('svg[aria-hidden="true"]').last().should("be.visible");
  });
});
