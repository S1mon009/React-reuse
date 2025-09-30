// describe("Code Component", () => {
//   beforeEach(() => {
//     // Ustawienia dla zapytań API
//     cy.intercept(
//       "GET",
//       "/api/read-file?filePath=/data/hooks/usechatgpt/hook.ts",
//       {
//         statusCode: 200,
//       }
//     ).as("getCodeContent");

//     // Odwiedzenie strony z komponentem
//     cy.visit("/en/docs/hooks/usechatgpt"); // Zmień na właściwy URL dla komponentu
//   });

//   it("should display loading state and fetch the code content", () => {
//     // Sprawdź, czy pokazuje się stan ładowania
//     cy.contains("Loading...").should("be.visible");

//     // Poczekaj na zakończenie zapytania
//     cy.wait("@getCodeContent");

//     // Sprawdź, czy zawartość kodu jest wyświetlana
//     cy.contains("ChatGPTResponse").should("be.visible");
//   });

//   //   it("should handle errors gracefully", () => {
//   //     // Przeprowadź intercept dla zapytania z błędem
//   //     cy.intercept("GET", "/api/code-content?code=mockCode", {
//   //       statusCode: 500,
//   //       body: { error: "Internal Server Error" },
//   //     }).as("getCodeError");

//   //     // Odśwież stronę, aby wymusić ponowne załadowanie
//   //     cy.reload();

//   //     // Poczekaj na odpowiedź
//   //     cy.wait("@getCodeError");

//   //     // Sprawdź, czy komunikat o błędzie jest widoczny
//   //     cy.contains("Error loading content.").should("be.visible");
//   //   });

//   //   it("should copy the code content to the clipboard", () => {
//   //     // Poczekaj na załadowanie zawartości
//   //     cy.wait("@getCodeContent");

//   //     // Kliknij przycisk kopiowania
//   //     cy.get('[aria-label="Copy to clipboard"]').click();

//   //     // Sprawdź, czy pokazuje się ikona potwierdzenia
//   //     cy.get('[aria-label="Copy to clipboard"]').within(() => {
//   //       cy.get('svg[data-icon="check"]').should("exist");
//   //     });

//   //     // Sprawdź, czy zawartość jest w schowku
//   //     cy.window().then((win) => {
//   //       win.navigator.clipboard.readText().then((text) => {
//   //         expect(text).to.eq('console.log("Hello, World!");');
//   //       });
//   //     });
//   //   });

//   //   it("should render horizontal scrollbar for long code", () => {
//   //     // Mock odpowiedzi z dużą ilością kodu
//   //     const longCode = 'console.log("Line 1");\n'.repeat(50);
//   //     cy.intercept("GET", "/api/code-content?code=mockCode", {
//   //       statusCode: 200,
//   //       body: { content: longCode },
//   //     }).as("getLongCode");

//   //     // Odśwież stronę
//   //     cy.reload();

//   //     // Poczekaj na odpowiedź
//   //     cy.wait("@getLongCode");

//   //     // Sprawdź, czy scroll bar jest widoczny
//   //     cy.get('[role="scrollbar"]').should("exist");
//   //   });
// });
