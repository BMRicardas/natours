# Natours Application

## Overview

Natours is a full-featured RESTful API application for managing and booking tours. Built with Node.js, Express, and MongoDB, this application offers a robust backend for tour operations with comprehensive security features and API functionality.

## Features

- **Tour Management**: Create, read, update, and delete tour information
- **Advanced API Features**:
  - Filtering (simple and advanced)
  - Sorting
  - Field limiting
  - Pagination
- **Security**:
  - Protected HTTP headers
  - Rate limiting
  - Data sanitization against NoSQL query injection and XSS
  - Parameter pollution prevention
  - Request body size limiting

## Technologies Used

- Node.js & Express
- MongoDB & Mongoose
- JSON Web Tokens for authentication
- Various security packages (helmet, xss, etc.)

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Steps

1. Clone the repository
2. Install dependencies:

```
npm install
```

3. Set up environment variables in a config.env file:

```
NODE_ENV=development
PORT=3000
DATABASE=your_mongodb_connection_string
DATABASE_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
```

4. Start the server:

```
npm start
```

## API Documentation

### Tours

- `GET /api/v1/tours` - Get all tours
- `GET /api/v1/tours/:id` - Get a specific tour
- `POST /api/v1/tours` - Create a new tour
- `PATCH /api/v1/tours/:id` - Update a tour
- `DELETE /api/v1/tours/:id` - Delete a tour

### Query Parameters

- **Filtering**: `?duration[gte]=5&difficulty=easy`
- **Sorting**: `?sort=price,ratingsAverage`
- **Field Limiting**: `?fields=name,duration,difficulty,price`
- **Pagination**: `?page=2&limit=10`

## Security Features

- HTTP headers protection with Helmet
- Rate limiting (max 100 requests per hour)
- Body parsing with 10KB limit
- Data sanitization against NoSQL injection attacks
- XSS protection
- Query parameter pollution prevention

## Project Structure

- app.js: Express application setup and middleware
- server.js: Server configuration
- routes: API route definitions
- controllers: Route handlers
- models: Database schema definitions
- utils: Utility functions and helpers
- dev-data: Development data for seeding the database

## Development

To run the application in development mode with logging:

```
npm run dev
```

## Credits

This application was developed as part of "Node.js, Express, MongoDB & More: The Complete Bootcamp" by Jonas Schmedtmann.
