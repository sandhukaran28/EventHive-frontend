
# EventHive Frontend (React + Vite App)

Developed for Queensland University of Technology, IFN666 Web and Mobile Application Development.

## Purpose

The **EventHive Frontend** is a modern, responsive, and interactive event booking platform built with **React**, **Vite**, and **Mantine UI**. It enables users to explore, book, and manage events, while providing administrators with tools to manage users, bookings, and event listings.

## Features

- **User Authentication:** Secure registration and login using JWT.
- **Event Management:** Create, edit, delete, and browse event listings.
- **Booking System:** Allows users to reserve spots in events with real-time seat updates.
- **Role-based Access Control:** Separate dashboards for users and admins.
- **Pagination & Feedback:** Paginated listings and visual feedback for actions like booking or deleting.

## How to Contribute

1. **Fork** the repository and clone it.
2. **Create a new branch** for your feature or fix.
3. Make changes following the project's code style.
4. **Commit** with clear messages.
5. **Push** to your fork and submit a **Pull Request**.

## Installation & Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```

## Deployment Notes

- Configure `vite.config.js` with:
```js
export default defineConfig({
  base: "/eventhive-app",
  plugins: [react()],
})
```

- Ensure `BrowserRouter` has:
```js
<BrowserRouter basename="/eventhive-app">
```

## Dependencies

- `react`, `react-router-dom` – Core UI and routing.
- `@mantine/core` – UI components and styling.
- `axios` – API requests.
- `dotenv` – Environment configuration.
- `vite` – Fast build tool.

## Folder Structure

```
/public
  └── favicon.svg

/src
  /components              # Shared UI components
  /pages                   # Page-level components
  /context                 # Auth context
  /api                     # Axios config
  App.jsx
  main.jsx
  vite.config.js
```

## Reporting Issues

1. Search existing issues before opening a new one.
2. Provide:
   - Description & steps to reproduce
   - Expected vs actual behavior
   - Logs or screenshots if needed

We appreciate your feedback and contributions!
