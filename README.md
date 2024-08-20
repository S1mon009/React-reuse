# React-redo

![Static Badge](https://img.shields.io/badge/React.js-react?style=flat&logo=react&labelColor=%23333&color=%2361DAFB) ![Static Badge](https://img.shields.io/badge/Next.js-react?style=flat&logo=nextdotjs&labelColor=%23333&color=%23000000) ![Static Badge](https://img.shields.io/badge/TypeScript-react?style=flat&logo=typescript&labelColor=%23333&color=%233178C6) ![Static Badge](https://img.shields.io/badge/Shadcn%2FUI-react?style=flat&logo=shadcnui&labelColor=%23333&color=%23000000) ![Static Badge](https://img.shields.io/badge/Tailwind%20CSS-react?style=flat&logo=tailwindcss&labelColor=%23333&color=%2306B6D4) ![Static Badge](https://img.shields.io/badge/ESLint-react?style=flat&logo=eslint&labelColor=%23333&color=%234B32C3)

## What is this?

Redo is a simple React library with the goal of saving you time by offering a large collection of hooks & utilities that will help you get the job done faster & more efficiently!

## Getting Started

First, download source code and install depencies:

```bash
npm install
```

after that run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Content

### Hooks

- `useChatGPT` - This custom hook interfaces with the ChatGPT API to generate conversational responses or complete text based on input prompts.
- `useClickOutside` - This hook detects clicks outside of a specified element, often used to close dropdowns or modals when a user clicks outside of them.
- `useClipboard` - This hook allows you to copy text or data to the clipboard programmatically, making it easier to implement copy-to-clipboard functionality in your application.
- `useCounter` - A simple hook for managing a counter with increment, decrement, and reset functions.
- `useDebounce` - This hook delays the processing of a function until after a specified wait time has elapsed since the last time it was invoked, useful for handling events like keystrokes.
- `useHover` - A hook that tracks whether a user is hovering over a specified element, useful for implementing hover effects.
- `useInterval` - This hook provides an interval function that runs repeatedly at specified intervals, often used for tasks like polling or animations.
- `useKeyboardShortcut` - A hook that allows you to define and handle custom keyboard shortcuts, simplifying the process of adding keyboard interactions to your application.
- `useLocalStorage` - This hook helps in managing state that is synchronized with localStorage, providing persistent data across sessions.
- `useMediaQuery` - This hook listens to media query changes and returns a boolean indicating if the query matches, often used for responsive design.
- `usePromiseAll` - This hook handles multiple promises concurrently, similar to Promise.all, and provides a way to manage their results and loading states.
- `useScrollIntoView` - This hook allows for smooth scrolling of a specified element into view, useful for improving user navigation and focus management.
- `useSearch` - A hook that manages search functionality, including filtering and searching through data collections based on user input.
- `useSort` - This hook helps in sorting arrays or lists of data according to specified criteria, making it easier to manage sorted views in your application.

### Utilities

- `Delay` - A component that renders its children with a delay. Useful for adding a loading or transition effect before displaying content.
- `Each` - A component that iterates over an array of data and renders a specified component or elements for each item. Ideal for dynamically displaying lists or collections of data.
- `Show` - A component that conditionally renders its children based on a given boolean value or condition. Useful for displaying or hiding content based on state or props.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
