# Ice Cream API

A simple Node.js API for managing ice cream flavors with SQLite database persistence.

## Endpoints

- `GET /icecream` - Get all flavors
- `POST /icecream` - Add a new flavor (body: `{ "flavor": "vanilla" }`)
- `PUT /icecream/:id` - Update a flavor by ID
- `DELETE /icecream/:id` - Delete a flavor by ID

## Running

1. `npm install`
2. `npm start`

The server will run on port 3000 by default. Data is persisted in `icecream.db`.
