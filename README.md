# REST API for User Management

This is a REST API built using Node.js, TypeScript, Express, and MongoDB.

## Features

- **User Authentication**: Register and log in with secure password hashing and session management.
- **User CRUD Operations**: Create, read, update, and delete users from the database.
- **Session Handling**: Manage user sessions with cookies and session tokens.
- **Protected Routes**: Middleware to authenticate users before accessing certain routes.

## Technologies

- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: MongoDB ODM for modeling application data.
- **TypeScript**: Used for type safety and improved development experience.
- **dotenv**: For managing environment variables.
- **bcrypt**: For hashing passwords.
- **Lodash**: Utility library for simplifying JavaScript code.
- **Cookie Parser**: For parsing cookies from requests.
- **Body Parser**: Middleware for handling JSON request bodies.
- **Compression**: Middleware for response compression.
- **Cors**: For handling cross-origin requests.

## API Endpoints

### Authentication Routes

| Method | Endpoint   | Description                             |
|--------|------------|-----------------------------------------|
| POST   | `auth/register` | Registers a new user                    |
| POST   | `auth/login`    | Logs in a user and creates a session    |

### User Routes

| Method | Endpoint     | Description                            |
|--------|--------------|----------------------------------------|
| GET    | `/users`      | Retrieves all users                    |
| DELETE | `/users/:id`  | Deletes a user by ID                   |
| PATCH  | `/users/:id`  | Updates a user by ID                   |

### Middleware

- **isAuthenticated**: Ensures the user is logged in before accessing protected routes.
- **isOwner**: Ensures the user has permission to modify or delete their own data.
