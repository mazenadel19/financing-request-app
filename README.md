# Financing Request App

A standalone React app for global representatives to submit **Financing Requests**.

---

## Project Structure

-   `src/`: Contains the source code of the application.
    -   `assets/`: Static assets such as images, fonts, etc.
    -   `components/`: Reusable UI components.
    -   `constants/`: Constants.
    -   `hooks/`: Custom hooks.
    -   `lib/`: Utility libraries.
    -   `pages/`: Application pages.
    -   `providers/`: Providers.
    -   `routes/`: Application routes.
    -   `services/`: Services.
    -   `stores/`: Stores.
    -   `types/`: Type definitions.
    -   `utils/`: Utility functions.
    -   `validation/`: Zod validation schemas for all forms.
    -   `App.tsx`: Root component.
    -   `main.tsx`: Entry point.

---

## Features

-   ⚡️ Vite for fast development and building
-   🔑 TypeScript for type safety
-   ⚛️ React for building user interfaces
-   📁 Organized folder structure for scalability
-   🧹 ESLint for code quality (pre-configured by Vite)
-   💅 Prettier for code formatting
-   🐶 Husky for Git hooks
-   🚫 lint-staged for running linters on Git staged files
-   📝 commitlint for conventional commit messages
-   🔄 Absolute imports configured in ESLint
-   🧭 React Router for navigation
-   🎨 Material UI (MUI) for UI components and theming
-   🔗 Axios for HTTP requests
-   📝 React Hook Form for form state management
-   🛡️ Zod for schema validation
-   🔔 React Toastify for user notifications

---

### Key Features

-   **Responsive Form UI:**  
    Works seamlessly on mobile and desktop, using Material UI.

-   **Dynamic Country & Currency Data:**  
    Fetches country names, ISO codes, and currency codes from a public API.  
    OPEC logic: If the selected country is an OPEC member, currency is forced to USD.

-   **Validation:**

    -   Project code: `XXXX-YYYY` (4 capital letters, dash, 4 digits 1-9)
    -   Description: max 150 characters
    -   Amount: positive decimal
    -   Currency: USD for OPEC, user-defined otherwise
    -   Date: at least 15 days in the future
    -   Validity period: 1, 2, or 3 years  
        Real-time validation with helpful error messages.

-   **UX Enhancements:**

    -   Submit button disabled until all fields are valid
    -   Loading indicator on submit
    -   Success/error alerts
    -   Focus moves to first invalid field
    -   Accessible and user-friendly

-   **Submission:**
    -   Sends only required fields to backend (`/api/requests`)
    -   Handles loading, success, and error states with clear feedback

---

## Getting Started

1. Clone the repository
2. Install dependencies:
    ```
    pnpm install
    ```
3. Start the development server:
    ```
    pnpm run dev
    ```

---

## Scripts

-   `pnpm run dev`: Start the development server
-   `pnpm run build`: Build for production
-   `pnpm run lint`: Run ESLint
-   `pnpm run preview`: Preview the production build locally

---

## Commit Convention

This project uses conventional commits. Please follow the [Conventional Commits](https://www.conventionalcommits.org/) specification when making commits.

---

## Contributing

Contributions are welcome! Please ensure you follow the project's commit convention and code style guidelines.

---

## License

[MIT](License.md)
