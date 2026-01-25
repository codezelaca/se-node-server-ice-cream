# Ice Cream API - Testing Instructions

This document provides step-by-step instructions to run and test the Ice Cream API with SQLite database persistence.

## Starting the Server

1. Open a terminal and navigate to the `icecream` folder:

   ```
   cd /Users/sayuru/Documents/GitHub/node-server-test/icecream
   ```

2. Install dependencies (if not already done):

   ```
   npm install
   ```

3. Start the server:

   ```
   npm start
   ```

4. You should see output like:
   ```
   Server running on http://localhost:3000
   ```
   The URL `http://localhost:3000` is clickable in VS Code terminals.

## Testing the API

Use these curl commands in a new terminal tab to test each endpoint:

### 1. Add a Flavor (POST)

```
curl -X POST http://localhost:3000/icecream -H "Content-Type: application/json" -d '{"flavor": "vanilla"}'
```

Expected response: `{"id": 1, "flavor": "vanilla"}`

### 2. Get All Flavors (GET)

```
curl http://localhost:3000/icecream
```

Expected response: `[{"id": 1, "flavor": "vanilla"}]`

### 3. Update a Flavor (PUT)

```
curl -X PUT http://localhost:3000/icecream/1 -H "Content-Type: application/json" -d '{"flavor": "chocolate"}'
```

Expected response: `{"id": 1, "flavor": "chocolate"}`

### 4. Delete a Flavor (DELETE)

```
curl -X DELETE http://localhost:3000/icecream/1
```

Expected response: (no content, status 204)

### 5. Verify Deletion (GET)

```
curl http://localhost:3000/icecream
```

Expected response: `[]` (empty array)

## Alternative Testing Tools

- **Postman**: Import the API endpoints and test with a GUI
- **Insomnia**: Similar to Postman
- **Browser**: For GET requests only, visit `http://localhost:3000/icecream`

## Stopping the Server

Press `Ctrl+C` in the terminal where the server is running.

## API Details

- **Base URL**: `http://localhost:3000`
- **Data Storage**: SQLite database (`icecream.db` file persists data between restarts)
- **Flavors**: Simple objects with `id` (auto-generated) and `flavor` (string) fields
