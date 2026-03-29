# Events Management API 📅

## Project Overview

This API is a backend solution designed for the management of community and corporate events. Built with Node.js, Express, and TypeScript, it provides a structured way to create, track, and manage event schedules while ensuring data integrity through Joi validation and type-safe model interfaces.

The project addresses the need for secure and well-documented middleware in application development. It implements security headers via Helmet.js and CORS policy to prevent unauthorized cross-origin resource sharing. This ensures the API is resistant to common web vulnerabilities like clickjacking.

This API is intended for developers building event frontends. It includes OpenAPI comments, allowing for automated documentation generation and interactive testing via Swagger UI.

---

## Installation Instructions

### Prerequisites

- Node.js v18.x or higher
- npm v9.x or higher
- TypeScript v5.x or higher

### Step-by-Step Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/rrc-w2025-cnagtalon/BED_Assignment_3.git
   cd BED_Assignment_3
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root:

   ```dotenv
   PORT=3000
   NODE_ENV=development
   ALLOWED_ORIGINS=http://localhost:3000
   ```

4. Start the server:

   ```bash
   # Development
   npm start

   # Build + docs
   npm run build
   npm run generate-docs
   ```

---

## API Request Examples

### 1) Get All Events

Request:

```bash
curl -X GET http://localhost:3000/api/v1/events
```

Response (200 OK):

```json
{
  "message": "Here are all the events.",
  "data": [
    {
      "id": "1Fmv0lUOxiQH3JYkl3cl",
      "name": "Test Event 2025 UPDATED NAME",
      "date": "2025-12-25T09:00:00.000Z",
      "capacity": 200,
      "registrationCount": 50,
      "status": "active",
      "category": "conference",
      "createdAt": {
        "_seconds": 1772420725,
        "_nanoseconds": 721000000
      },
      "updatedAt": {
        "_seconds": 1772421299,
        "_nanoseconds": 936000000
      }
    }
  ]
}
```

---

### 2) Create a New Event

Request:

```bash
curl -X POST http://localhost:3000/api/v1/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "date": "2027-12-29T09:00:00.000Z",
    "capacity": 200
  }'
```

Response (201 Created):

```json
{
  "message": "Event created",
  "data": "2DLNOox0NH9vF1cywKpM"
}
```

---

### 3) Update an Event

Request:

```bash
curl -X PUT http://localhost:3000/api/v1/events/6HZTtuIBpp3dhrNRmjQd \
  -H "Content-Type: application/json" \
  -d '{
    "registrationCount": 100
  }'
```

Response (200 OK):

```json
{
  "message": "Data retrieved.",
  "data": {
    "id": "4PY0y8ND0EnxyQvHd8so",
    "name": "Event",
    "date": {
      "_seconds": 1861347600,
      "_nanoseconds": 0
    },
    "capacity": 200,
    "registrationCount": 50,
    "status": "active",
    "category": "conference",
    "createdAt": {
      "_seconds": 1772500670,
      "_nanoseconds": 362000000
    },
    "updatedAt": {
      "_seconds": 1772500670,
      "_nanoseconds": 362000000
    }
  }
}
```

---

### 4) Delete an Event

Request:

```bash
curl -X DELETE http://localhost:3000/api/v1/events/6HZTtuIBpp3dhrNRmjQd
```

Response (200 OK):

```json
{
  "message": "Successful deletion of 6HZTtuIBpp3dhrNRmjQd"
}
```

---

## Data Validation Rules

- Category: `conference`, `workshop`, `seminar`, `meetup`, `general` (default)
- Status: `canceled`, `completed`, `active` (default)
- Validation uses **Joi** for payload structure and data types

---

## Documentation

Public docs: [https://rrc-w2025-cnagtalon.github.io/BED_Assignment_3/](https://rrc-w2025-cnagtalon.github.io/BED_Assignment_3/)

Local Swagger UI: `http://localhost:3000/api-docs`

