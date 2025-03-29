# Reqres User Management

## Overview
Reqres User Management is a web application that allows users to manage a list of users via the Reqres API. It provides authentication, user management, and a responsive design for an enhanced user experience.

## Installation

### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/reqres-user-management.git
cd reqres-user-management
```

### 2. Install Dependencies
```sh
npm install
# or
yarn install
```

## Running the Application

Start the development server:
```sh
npm start
# or
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Login Credentials
Use the following credentials to log in:
- **Email**: `eve.holt@reqres.in`
- **Password**: `cityslicka`

These credentials are pre-filled in the login form for convenience.

## Features

- **Authentication**: Login/logout functionality.
- **User Dashboard**: View all users with pagination.
- **Search**: Filter users by name or email.
- **User Management**:
  - View user details.
  - Edit user information (first name, last name, email).
  - Delete users.
- **Responsive Design**: Works on mobile and desktop devices.

## Project Structure

```plaintext
src/
├── components/       # Reusable UI components
├── pages/            # Page components
├── styles/           # CSS files
├── App.js            # Main application component
├── index.js          # Application entry point
└── utils.js          # Utility functions
```

## Assumptions and Considerations

### 1. API Limitations
- The Reqres API is a test API that simulates responses.
- PUT and DELETE operations don't actually modify server data but return success responses.
- The API has limited data (only a few pages of users).

### 2. Authentication
- Uses simple token-based authentication with `localStorage`.
- No refresh tokens or session expiration handling is implemented.
- In a production app, a more secure authentication method would be needed.

### 3. Data Management
- User data is fetched from the API on each page change.
- Updates and deletes are simulated in the UI but don't persist on server reload.
- No global state management (like Redux) is used for simplicity.

### 4. Error Handling
- Basic error handling is implemented for API requests.
- Network errors and API failures show user-friendly messages.
- More comprehensive error handling would be needed in production.

### 5. Browser Compatibility
- The application is designed for modern browsers.
- No polyfills are included for older browser support.

## Contributing
Feel free to submit pull requests or report issues.

## License
This project is open-source and available under the [MIT License](LICENSE).
