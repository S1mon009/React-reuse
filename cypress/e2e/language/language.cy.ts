describe("LanguageToggle Component E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/en");
  });

  it("should display the correct language button based on the current locale", () => {
    cy.get('button[aria-label="Toggle language"]').should("contain.text", "EN");
    cy.visit("/pl");
    cy.get('button[aria-label="Toggle language"]').should("contain.text", "PL");
  });

  it("should open the dropdown menu when the button is clicked", () => {
    cy.get('button[aria-label="Toggle language"]').click({ force: true });
    cy.get('div[aria-label="Language options"]').should("be.visible");
  });

  it("should change locale when a language option is selected", () => {
    cy.get('button[aria-label="Toggle language"]').click({ force: true });
    cy.contains("English").click({ force: true });
    cy.url().should("include", "/en");
  });

  it("should display correct translation text based on selected language", () => {
    cy.visit("/pl");
    cy.get('button[aria-label="Toggle language"]').click({ force: true });
    cy.contains("Polski").click({ force: true });
  });
});
