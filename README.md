# CampusEats - College Club Event Management System

A full-stack College Club Event Management System with role-based dashboards for students and admins.

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT + bcrypt password hashing

## Project Structure

```
CampusEats/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      scripts/
      utils/
  frontend/
    src/
      api/
      components/
      context/
      pages/
      styles/
```

## Features

### Student
- Register & login
- Browse clubs and events
- Register for events with seat validation
- View registered events in dashboard

### Admin
- Create clubs and events
- View students and registrations
- Delete events
- Manage club members through API
- View dashboard metrics

## Setup Instructions

### 1) Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### 3) Seed data
```bash
cd backend
npm run seed
```

Seeded login password for all users: `Password@123`

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Clubs
- `POST /api/clubs/create` (admin)
- `GET /api/clubs`
- `GET /api/clubs/:id`
- `PATCH /api/clubs/:id/members` (admin)

### Events
- `POST /api/events/create` (admin)
- `GET /api/events`
- `POST /api/events/register/:eventId` (student)
- `DELETE /api/events/:id` (admin)

### Users
- `GET /api/users` (admin)
- `GET /api/users/me`
- `GET /api/users/stats` (admin)

## Notes
- Uses environment variables for DB URI and JWT secret.
- Includes duplicate registration and capacity checks.
- Event cards show dynamic available seats and registration state.
