# Ice Cream API

A simple Node.js RESTful API for managing ice cream flavors with SQLite database persistence. This project is a learning material for **CCA (Codezela Career Accelerator) Session 3 - Software Engineer Pathway**.

---

## Table of Contents

- [Overview](#overview)
- [Learning Objectives](#learning-objectives)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Testing the API](#testing-the-api)
- [Understanding the Code](#understanding-the-code)
- [Best Practices Demonstrated](#best-practices-demonstrated)
- [Common Issues & Solutions](#common-issues--solutions)
- [Next Steps & Extensions](#next-steps--extensions)
- [Contact](#contact)

---

## Overview

This project demonstrates the fundamentals of building a RESTful API with Node.js, Express.js, and SQLite. It implements full CRUD (Create, Read, Update, Delete) operations for managing a simple resource: ice cream flavors.

**Key Features:**
- RESTful API design with proper HTTP methods and status codes
- SQLite database for persistent data storage
- Input validation and error handling
- Parameterized SQL queries for security
- Clean, readable code structure

---

## Learning Objectives

By studying and working with this project, you will learn:

1. **RESTful API Design**
   - Resource-based URL structure
   - Proper use of HTTP methods (GET, POST, PUT, DELETE)
   - Appropriate HTTP status codes (200, 201, 204, 400, 404, 500)
   - JSON request/response format

2. **Node.js & Express.js Fundamentals**
   - Setting up an Express server
   - Defining routes and handling requests
   - Middleware usage (JSON parsing)
   - Request/response object handling
   - URL parameters and route handlers

3. **Database Integration with SQLite**
   - Database connection setup
   - Creating tables programmatically
   - CRUD operations with SQL
   - Parameterized queries to prevent SQL injection
   - Database error handling

4. **API Development Best Practices**
   - Input validation
   - Consistent error responses
   - Proper separation of concerns
   - Code readability and maintainability

5. **API Testing**
   - Using curl for command-line testing
   - Understanding request/response cycles
   - Testing all CRUD operations systematically

---

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | - | JavaScript runtime environment |
| **Express.js** | 4.22.1 | Web application framework for Node.js |
| **SQLite3** | 5.1.6 | Lightweight, file-based SQL database |
| **npm** | - | Node Package Manager for dependencies |

### Why This Stack?

- **Node.js**: Enables JavaScript on the server-side, widely used for APIs
- **Express.js**: Minimal, flexible framework with robust routing and middleware support
- **SQLite3**: Serverless, zero-configuration database perfect for learning and development

---

## Project Structure

```
icecream/
├── server.js           # Main application server with all routes and database logic
├── package.json        # Project metadata and dependencies
├── package-lock.json   # Locked dependency versions
├── .gitignore          # Git ignore rules
├── README.md           # This file - project documentation
├── TESTING.md          # Detailed testing instructions with curl examples
└── icecream.db         # SQLite database file (created automatically)
```

### File Descriptions

- **[server.js](server.js)**: The heart of the application. Contains all API routes, database setup, and business logic (86 lines).
- **[package.json](package.json)**: Defines project dependencies and start scripts.
- **[.gitignore](.gitignore)**: Specifies files to exclude from version control (node_modules, .env files, etc.).
- **[TESTING.md](TESTING.md)**: Step-by-step testing guide with curl commands.

---

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v14 or higher recommended) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for version control)

### Check Your Installation

```bash
node --version
npm --version
```

---

## Installation

1. **Navigate to the project directory:**

   ```bash
   cd icecream
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   This will install:
   - `express` - Web framework
   - `sqlite3` - Database driver

3. **Verify installation:**

   Check that a `node_modules` folder was created.

---

## Running the Server

### Start the Server

```bash
npm start
```

### Expected Output

```
Connected to SQLite database.
Server running on http://localhost:3000
```

### Configuration

- **Default Port**: 3000
- **Custom Port**: Set the `PORT` environment variable

  ```bash
  PORT=8080 npm start
  ```

### Stopping the Server

Press `Ctrl+C` in the terminal where the server is running.

---

## API Endpoints

### Base URL

```
http://localhost:3000
```

### Endpoint Overview

| Method | Endpoint | Description | Request Body | Success Status |
|--------|----------|-------------|--------------|----------------|
| GET | `/icecream` | Get all flavors | None | 200 OK |
| POST | `/icecream` | Add new flavor | `{"flavor": "vanilla"}` | 201 Created |
| PUT | `/icecream/:id` | Update flavor | `{"flavor": "chocolate"}` | 200 OK |
| DELETE | `/icecream/:id` | Delete flavor | None | 204 No Content |

---

### Detailed Endpoint Documentation

#### 1. Get All Flavors

Retrieves all ice cream flavors from the database.

**Request:**
```http
GET /icecream
```

**Response (200 OK):**
```json
[
  {"id": 1, "flavor": "vanilla"},
  {"id": 2, "flavor": "chocolate"}
]
```

**Error Response (500):**
```json
{"error": "database error message"}
```

---

#### 2. Add New Flavor

Creates a new ice cream flavor with an auto-generated ID.

**Request:**
```http
POST /icecream
Content-Type: application/json

{"flavor": "vanilla"}
```

**Response (201 Created):**
```json
{"id": 1, "flavor": "vanilla"}
```

**Error Response (400 Bad Request):**
```json
{"error": "Flavor is required"}
```

---

#### 3. Update Flavor

Updates an existing flavor by ID.

**Request:**
```http
PUT /icecream/1
Content-Type: application/json

{"flavor": "chocolate"}
```

**Response (200 OK):**
```json
{"id": 1, "flavor": "chocolate"}
```

**Error Responses:**

- `400 Bad Request` - Missing flavor field
  ```json
  {"error": "Flavor is required"}
  ```

- `404 Not Found` - Flavor ID doesn't exist
  ```json
  {"error": "Flavor not found"}
  ```

---

#### 4. Delete Flavor

Deletes a flavor by ID.

**Request:**
```http
DELETE /icecream/1
```

**Response (204 No Content):**
Empty body

**Error Response (404 Not Found):**
```json
{"error": "Flavor not found"}
```

---

## Database Schema

### Table: `flavors`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unique identifier |
| `flavor` | TEXT | NOT NULL | Name of the ice cream flavor |

### SQL Schema

```sql
CREATE TABLE IF NOT EXISTS flavors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  flavor TEXT NOT NULL
);
```

### Database Operations

| Operation | SQL Query |
|-----------|-----------|
| Get all | `SELECT * FROM flavors` |
| Insert | `INSERT INTO flavors (flavor) VALUES (?)` |
| Update | `UPDATE flavors SET flavor = ? WHERE id = ?` |
| Delete | `DELETE FROM flavors WHERE id = ?` |

### Database Features

- **Auto-created**: Table is created automatically on server start
- **Persistent**: Data survives server restarts (stored in `icecream.db`)
- **Parameterized queries**: Prevents SQL injection attacks
- **Single file storage**: Easy to backup and move

---

## Testing the API

For detailed testing instructions, see [TESTING.md](TESTING.md).

### Quick Start with curl

**1. Start the server:**
```bash
npm start
```

**2. In a new terminal, test the endpoints:**

```bash
# Add a flavor
curl -X POST http://localhost:3000/icecream \
  -H "Content-Type: application/json" \
  -d '{"flavor": "vanilla"}'

# Get all flavors
curl http://localhost:3000/icecream

# Update a flavor
curl -X PUT http://localhost:3000/icecream/1 \
  -H "Content-Type: application/json" \
  -d '{"flavor": "chocolate"}'

# Delete a flavor
curl -X DELETE http://localhost:3000/icecream/1
```

### Alternative Testing Tools

- **Postman** - GUI-based API testing
- **Insomnia** - Similar to Postman
- **Browser** - For GET requests only, visit `http://localhost:3000/icecream`
- **VS Code REST Client** - Extension for API testing

---

## Understanding the Code

### Code Walkthrough

Let's break down the key components of [server.js](server.js):

#### 1. Imports and Setup

```javascript
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
app.use(express.json());
```

- `express`: Import the Express framework
- `sqlite3`: Import SQLite3 driver with verbose error messages
- `express.json()`: Middleware to parse JSON request bodies

#### 2. Database Connection

```javascript
const db = new sqlite3.Database("./icecream.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});
```

- Opens/creates the SQLite database file
- Provides error handling callback

#### 3. Table Creation

```javascript
db.run(`CREATE TABLE IF NOT EXISTS flavors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  flavor TEXT NOT NULL
)`);
```

- Creates the table if it doesn't exist
- Ensures the database schema is always ready

#### 4. GET Endpoint

```javascript
app.get("/icecream", (req, res) => {
  db.all("SELECT * FROM flavors", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});
```

- Uses `db.all()` to fetch all rows
- Returns 500 error if query fails
- Returns JSON array of flavors on success

#### 5. POST Endpoint

```javascript
app.post("/icecream", (req, res) => {
  const { flavor } = req.body;
  if (!flavor) {
    return res.status(400).json({ error: "Flavor is required" });
  }
  db.run("INSERT INTO flavors (flavor) VALUES (?)", [flavor], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, flavor });
  });
});
```

- Extracts `flavor` from request body
- Validates input (returns 400 if missing)
- Uses parameterized query (`?` placeholder)
- Returns 201 with created object including generated ID

#### 6. PUT Endpoint

```javascript
app.put("/icecream/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { flavor } = req.body;
  if (!flavor) {
    return res.status(400).json({ error: "Flavor is required" });
  }
  db.run(
    "UPDATE flavors SET flavor = ? WHERE id = ?",
    [flavor, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Flavor not found" });
      }
      res.json({ id, flavor });
    }
  );
});
```

- Extracts ID from URL parameter (`:id`)
- Parses ID to integer
- Checks `this.changes` to detect if row was found
- Returns 404 if no rows were updated

#### 7. DELETE Endpoint

```javascript
app.delete("/icecream/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.run("DELETE FROM flavors WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Flavor not found" });
    }
    res.status(204).send();
  });
});
```

- Deletes row by ID
- Returns 204 No Content on success (empty body)
- Returns 404 if no rows were deleted

#### 8. Server Startup

```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

- Reads PORT from environment variable or defaults to 3000
- Starts listening for connections

---

## Best Practices Demonstrated

This project showcases several important best practices for API development:

### 1. RESTful Design Principles

- **Resource-based URLs**: `/icecream` represents the resource
- **HTTP methods correctly used**:
  - GET for reading
  - POST for creating
  - PUT for updating
  - DELETE for deleting
- **Appropriate status codes**:
  - 200 OK - Successful GET/PUT
  - 201 Created - Successful POST
  - 204 No Content - Successful DELETE
  - 400 Bad Request - Invalid input
  - 404 Not Found - Resource doesn't exist
  - 500 Internal Server Error - Server/database errors

### 2. Security

- **Parameterized SQL queries**: All database operations use `?` placeholders to prevent SQL injection
  ```javascript
  db.run("INSERT INTO flavors (flavor) VALUES (?)", [flavor], ...);
  ```
- **Input validation**: Checks for required fields before processing
  ```javascript
  if (!flavor) {
    return res.status(400).json({ error: "Flavor is required" });
  }
  ```

### 3. Error Handling

- **Consistent error responses**: All errors return JSON with an `error` field
- **Appropriate status codes**: Different status codes for different error types
- **Database error handling**: Catches and returns database errors

### 4. Code Quality

- **Clear variable naming**: Descriptive names like `flavor`, `id`, `db`
- **Comments**: Each endpoint has a descriptive comment
- **Consistent structure**: Similar error handling patterns across all endpoints
- **Early returns**: Uses early returns for validation and error cases

### 5. API Design

- **Idempotent operations**: GET, PUT, and DELETE are idempotent
- **Predictable responses**: Consistent JSON structure for all responses
- **Resource identifiers**: Uses auto-incrementing IDs for resources

---

## Common Issues & Solutions

### Issue: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
- Change the port: `PORT=3001 npm start`
- Or kill the process using port 3000:
  ```bash
  # macOS/Linux
  lsof -ti:3000 | xargs kill -9

  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  ```

### Issue: Module Not Found

**Error:**
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
npm install
```

### Issue: Database Locked

**Error:**
```
Error: SQLITE_BUSY: database is locked
```

**Solution:**
- Ensure only one server instance is running
- Delete `icecream.db` and restart the server to create a fresh database

### Issue: Cannot Parse JSON

**Error:**
```
SyntaxError: Unexpected token in JSON
```

**Solution:**
- Ensure your request body is valid JSON
- Include the `Content-Type: application/json` header
- Use double quotes for JSON keys and string values

---

## Next Steps & Extensions

Once you're comfortable with this project, consider these extensions to deepen your learning:

### Beginner Extensions

1. **Add More Fields**
   - Add `description`, `price`, or `inStock` fields
   - Update the database schema and API endpoints

2. **Add Search/Filter**
   - GET `/icecream?search=vani` to search flavors
   - GET `/icecream?sort=asc` for sorted results

3. **Input Validation**
   - Validate flavor length (min/max characters)
   - Prevent duplicate flavors

4. **CORS Support**
   - Add CORS middleware to allow browser-based API calls
   ```javascript
   app.use((req, res, next) => {
     res.header('Access-Control-Allow-Origin', '*');
     next();
   });
   ```

### Intermediate Extensions

1. **Code Organization**
   - Separate routes into their own file
   - Create a models folder for database operations
   - Implement MVC (Model-View-Controller) pattern

2. **Environment Configuration**
   - Use `dotenv` for environment variables
   - Separate config for development and production

3. **Logging**
   - Add request logging middleware
   - Log database operations
   - Use a logging library like `morgan` or `winston`

4. **API Documentation**
   - Add Swagger/OpenAPI documentation
   - Interactive API explorer

### Advanced Extensions

1. **Authentication & Authorization**
   - Add JWT-based authentication
   - Protect routes with middleware
   - User-specific flavors

2. **Advanced Database Features**
   - Migration scripts for schema changes
   - Database connection pooling
   - Switch to PostgreSQL or MySQL

3. **Testing**
   - Unit tests with Jest
   - Integration tests with Supertest
   - API test automation

4. **Docker Deployment**
   - Create a Dockerfile
   - Docker Compose for app + database
   - Deploy to cloud platforms

---

## HTTP Status Code Reference

| Code | Name | Usage in This API |
|------|------|-------------------|
| 200 | OK | Successful GET and PUT requests |
| 201 | Created | Successful POST request (resource created) |
| 204 | No Content | Successful DELETE request |
| 400 | Bad Request | Missing or invalid input |
| 404 | Not Found | Resource ID doesn't exist |
| 500 | Internal Server Error | Database or server errors |

---

## SQL Injection Prevention

This project uses **parameterized queries** to prevent SQL injection attacks.

**❌ Vulnerable (Never do this):**
```javascript
db.run(`INSERT INTO flavors (flavor) VALUES ('${flavor}')`);
```

**✅ Secure (This project's approach):**
```javascript
db.run("INSERT INTO flavors (flavor) VALUES (?)", [flavor]);
```

The `?` placeholder ensures user input is treated as data, not executable code.

---

## REST API Quick Reference

**REST** = REpresentational State Transfer

Key principles:
- **Resources**: Nouns (icecream, users, products)
- **HTTP Methods**: Verbs (GET, POST, PUT, DELETE)
- **Stateless**: Each request contains all needed information
- **Uniform Interface**: Consistent URL structure

**Common REST Patterns:**

| Action | HTTP Method | URL | Example |
|--------|-------------|-----|---------|
| List all | GET | `/resource` | `GET /icecream` |
| Get one | GET | `/resource/:id` | `GET /icecream/1` |
| Create | POST | `/resource` | `POST /icecream` |
| Update | PUT/PATCH | `/resource/:id` | `PUT /icecream/1` |
| Delete | DELETE | `/resource/:id` | `DELETE /icecream/1` |

---

## Additional Resources

### Documentation
- [Express.js Official Guide](https://expressjs.com/en/guide/routing.html)
- [SQLite3 Documentation](https://www.sqlite.org/docs.html)
- [Node.js Documentation](https://nodejs.org/docs/)

### Tutorials
- [MDN Web API Guide](https://developer.mozilla.org/en-US/docs/Web/API)
- [REST API Tutorial](https://restfulapi.net/)

### Tools
- [Postman](https://www.postman.com/) - API testing tool
- [Insomnia](https://insomnia.rest/) - REST client
- [DB Browser for SQLite](https://sqlitebrowser.org/) - Visual database tool

---

## About CCA

This project is part of the **Codezela Career Accelerator (CCA)** Session 3 curriculum for the Software Engineer Pathway. CCA provides comprehensive training programs to help you accelerate your career in software development.

### What You'll Learn in This Pathway

- **Session 1**: Fundamentals of programming
- **Session 2**: Advanced JavaScript concepts
- **Session 3**: Backend development with Node.js (this project)
- **Session 4**: Frontend development with React
- **Session 5**: Full-stack application development
- **Session 6**: Deployment and DevOps practices

---

## Contact

**Codezela Career Accelerator**

- **Email**: [ca@codezela.com](mailto:ca@codezela.com)
- **Website**: [https://cca.it.com](https://cca.it.com)

For questions about this project or the CCA program, reach out to us!

---

## License

This project is part of the CCA learning materials and is intended for educational purposes.

---

**Happy Learning!** 🍦

Built with ❤️ by the Codezela Career Accelerator team.
