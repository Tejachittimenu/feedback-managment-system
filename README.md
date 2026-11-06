# Feedback Studio — React + Vite

A fresh, component-based implementation of the Feedback Management System. The new version uses a role-aware React workspace, focused feedback cards, a split customer/admin navigation model and a redesigned responsive interface. Data persists in the browser using Local Storage; the current sign-in is kept in Session Storage.

## Requirements

- Node.js 18+ and npm

## Run locally

On Windows, double-click **Start Feedback Studio.bat**. It installs the project dependencies the first time and starts the app. Keep the command window open, then open the local address Vite prints (usually `http://localhost:5173`). Do not open `index.html` directly.

Or use a terminal in the project folder:

```bash
npm install
npm run dev
```

Vite prints the local development URL (usually `http://localhost:5173`). To create and preview the production build:

```bash
npm run build
npm run preview
```

Run the built-in data and report tests with `npm test`.

## Demo administrator

- Username: `admin`
- Password: `Admin123!`

Customers can create an account from the sign-in screen. Data is scoped to the browser profile and is not shared between devices or browsers. Clear the site's Local Storage to reset demo data; the administrator record is recreated automatically.

## Features

### Customers

- Create customer or administrator accounts and sign in through the matching role
- Reset a password by confirming the account type, username and email saved in this browser
- Submit feedback with subject, category, 1–5 star rating and message
- See personal feedback history, status and administrator replies
- Edit profile name and email

### Administrators

- Overview with live feedback counts, resolution status and rating distribution
- Search and filter all submissions
- Update status and send customer-visible replies
- View the customer list and feedback analytics
- Export the feedback report to CSV
- Edit the administrator profile

Account creation is open for both roles in this demo. Password reset is a local demonstration: it checks the selected role, username and email in browser storage and changes the locally stored password. It does not send an email or prove account ownership. In production, administrator creation must be restricted and password recovery must use a verified backend flow.

## Deployment to Vercel

1. Push this project folder to a GitHub repository.
2. Import the repository in Vercel and select the Vite preset.
3. Use `npm run build` as the build command and `dist` as the output directory.
4. Deploy. The included `vercel.json` rewrites app routes to `index.html` for SPA hosting.

## Coursework and security note

This is a client-side coursework/demo app. Local Storage is editable by the browser user, and credentials are kept in the browser; role checks are not server-enforced. Do not use real customer data or real passwords. A production system needs a backend, secure password hashing, server-side authorization and managed persistence.
