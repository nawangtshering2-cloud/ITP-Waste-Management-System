# E-Waste Management System

This project is a customized MERN platform for e-waste pickup requests, recycler discovery, awareness content, notifications, and admin oversight. It is based on the original ecoBin waste-management codebase and extends the existing architecture rather than replacing it.

## Features

- Secure user registration and login
- Role-aware access for `USER`, `ADMIN`, and `RECYCLER`
- E-waste pickup request flow with tracking codes and status lifecycle
- Recycler directory with verification and activation controls
- Recycler locator using Leaflet and OpenStreetMap
- In-app notifications for pickup and recycler events
- Awareness section for e-waste education
- EcoBot chatbot with graceful fallback if no LLM API is configured
- Admin dashboard and user management views

## Tech Stack

- Frontend: React 17, React Router v5, Axios, Bootstrap, Leaflet
- Backend: Node.js, Express, Passport, JSON Web Tokens
- Database: MongoDB with Mongoose

## Architecture

- `BACKEND/server.js` wires the Express server and mounts the REST routes.
- `BACKEND/Models/EWaste` contains the e-waste schemas for pickups, recyclers, notifications, awareness content, and collection centres.
- `BACKEND/routes/ewaste` exposes the new APIs for pickup, recycler, notification, awareness, centre, and chatbot workflows.
- `frontend/src/App.js` contains the branded navigation and route map for the dashboard, pickup, recycler, awareness, notification, chatbot, and admin views.

## Installation

1. Install backend dependencies from `BACKEND/`.
2. Install frontend dependencies from `frontend/`.
3. Create the environment variables listed below.
4. Start MongoDB.

## Environment Variables

Create a `.env` file in `BACKEND/` with values similar to:

```env
PORT=8070
MONGODB_URL=mongodb://127.0.0.1:27017/ewaste_management
JWT_SECRET=change-this-secret
JWT_EXPIRES_IN=1h
CLIENT_URL=http://localhost:3000
LLM_API_URL=
LLM_API_KEY=
REACT_APP_API_BASE_URL=http://localhost:8070
```

`LLM_API_URL` and `LLM_API_KEY` are optional. If they are not provided, EcoBot uses a built-in fallback response.

## Database Setup

- The project uses MongoDB and Mongoose.
- Existing collections are reused where possible.
- New e-waste collections are created for pickups, recyclers, notifications, awareness content, and collection centres.

## Run Backend

From `BACKEND/`:

```bash
npm install
npm run dev
```

## Run Frontend

From `frontend/`:

```bash
npm install
npm start
```

## Admin Setup

- Register a user and set the role to `admin` in MongoDB if needed for local development.
- Admin-only screens are available under `/admin/*`.

## Recycler Setup

- Recycler entries are managed from the admin side.
- Verified and active recyclers are visible to users in the recycler locator.

## Chatbot Setup

- If `LLM_API_URL` and `LLM_API_KEY` are configured, EcoBot forwards requests to the external service.
- Without those variables, the app returns a safe fallback answer so the UI never breaks.

## Deployment Notes

- Set the backend and frontend environment variables in your hosting platform.
- Ensure MongoDB is reachable from the deployed backend.
- Update `CLIENT_URL` and `REACT_APP_API_BASE_URL` for the production domains.

## Original Project Attribution

This repository is a customized academic fork of the original ecoBin waste-management system. The base project attribution and licensing should remain intact.
