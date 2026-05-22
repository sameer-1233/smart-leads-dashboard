# Smart Leads CRM

A full-stack Smart CRM Dashboard built using React, TypeScript, Node.js, Express, MongoDB, and Tailwind CSS.

---

## Features

- JWT Authentication
- Role Based Access Control (RBAC)
- Lead CRUD Operations
- Debounced Search
- Backend Pagination
- CSV Export
- Analytics Dashboard
- Protected Routes
- Dark Mode
- Docker Setup

---

## Tech Stack

Frontend:
- React
- TypeScript
- Tailwind CSS
- Vite

Backend:
- Node.js
- Express.js
- MongoDB
- JWT

---

## Setup Instructions

### Frontend

cd client

npm install

npm run dev

---

### Backend

cd server

npm install

npm run dev

---

## Environment Variables

Create `.env` inside server folder.

Example:

PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

---

## Live Deployment

Frontend:
https://your-vercel-link.vercel.app

Backend:
https://smart-leads-dashboard-s2d3.onrender.com

---

## API Routes

POST /api/auth/register

POST /api/auth/login

GET /api/leads

POST /api/leads

PUT /api/leads/:id

DELETE /api/leads/:id

## Docker Setup

Run project using Docker:

docker-compose up --build