# Re Books: Front-End Repository

[Visit Website](https://rebooksctd.netlify.app/)

Welcome to the front-end repository for **Re Books** — an innovative platform connecting individuals who wish to sell books from their personal libraries with those eager to purchase them. This application fosters a community-driven marketplace where users can list books for sale, browse available collections, and communicate seamlessly with each other.

This repository contains the **React.js application** code, which interfaces with our [Back-End Repository](https://github.com/Code-the-Dream-School/hh-team6-back).

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Key Features](#key-features)
3. [Quick Start](#quick-start)
4. [Presentation](#presentation)
5. [Authors](#authors)

## Technologies Used

Our front-end is powered by modern tools and libraries to ensure a smooth, efficient, and intuitive user experience:

- **Frameworks:**

  - `React` - A JavaScript library for building user interfaces with a component-based architecture.

- **Routing and Navigation:**

  - `React Router Dom` - Enables dynamic routing for an intuitive single-page application experience.

- **State Management:**

  - `React Context API` - Manages global application state, such as user authentication, book data, and notifications.

- **HTTP Requests:**

  - `Axios` - Handles API communication with the back-end server.

- **UI Components and Design:**

  - `Headless UI` - Provides accessible and completely unstyled UI components, giving full control over styling and functionality.

- **Styling and CSS Frameworks:**

  - `Tailwind CSS` - A utility-first CSS framework for responsive and modern UI design.

- **Development and Build Tools:**
  - `Vite` - A fast front-end build tool for a streamlined development experience.
  - `ESLint` - Ensures consistent and clean code through linting.
  - `Prettier` - Formats code automatically for readability and uniformity.

## Development Scripts

This project includes several NPM scripts to facilitate development, testing, and production builds:

- **`start`**:
  Serves the production build from the `dist` directory.

  ```bash
  npm start
  ```

- **`build`**:
  Builds the project for production.

  ```bash
  npm run build
  ```

- **`format`**:
  Formats the codebase using Prettier.

  ```bash
  npm run format
  ```

- **`lint`**:
  Lints the codebase using ESLint.

  ```bash
  npm run lint
  ```

- **`preview`**:
  Serves the built application locally.

  ```bash
  npm run preview
  ```

## Key Features

### User Registration and Account Management

- **Sign Up**: Users can register an account to buy and sell books.
- **Account Management**: Users can provide detailed profile information and manage their listed and purchased books.
- **Dashboard**: Displays sections for managing books in user's account.
- **Password Management**: Allows users to reset or update their password.

### Search, Filtering, and Sorting

- **Search Functionality**: Search for books by title, author, or ISBN.
- **Filter Options**: Narrow results by age category, genre, format, and condition.
- **Sorting and Pagination**: Organize search results for easier browsing.

### Book Viewing and Purchasing

- **List View**: View all books that are available in stock.
- **Detailed Views**: View book details, including cover, author, genre, price, and condition.
- **Purchase Books**: Users can purchase books after logging in.

<!-- ### Communication/Notification System -->

### Communication System

- **Messaging**: Real-time messaging using Socket.io. for immediate interaction between users regarding books.
<!-- - **Notifications**: Alerts for messages and book-related updates. -->

<!-- ### Stretch Goal: Online Payment for Books

- **Payment Integration**: Securely process payments with Stripe or PayPal.
- **Payment Records**: Store payment history and provide transaction details in user profiles. -->

## Quick Start

### Setup

1. **Clone the Repository**: Clone this repository to your local machine.
2. **Install Dependencies**: Run `npm install` to install required packages.
3. **Create a `.env.local` File**: Create a `.env.local` file in the root directory and add the following variable:

```bash
  VITE_API_BASE_URL=http://localhost:8000
```

4. **Start the Development Server**: Run `npm run dev` to start the application locally on `localhost:5173`.
5. **Explore the Application**: Register an account and explore features such as book search, filtering, and messaging.

### Additional Configuration

- Ensure the back-end server is running as per the instructions in our [Back-End Repository](https://github.com/Code-the-Dream-School/hh-team6-back).

<!-- ### Environment Variables

Set up a `.env` file in the root directory with the following variables:

- **`VITE_API_BASE_URL`**: URL for the API backend.

  ```bash
  VITE_API_BASE_URL=http://localhost:8000/api/v1
  ``` -->

## Presentation

- [Final Presentation Slides](#)

## Authors

- Evgenii Rychkov
- Brandon Warren
- Liuba Barusch
