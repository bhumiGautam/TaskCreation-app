#  (Fullstack task App)

A minimal full-stack task management application with a Node.js/Express backend and a React/Vite frontend.

---

## 🚀 Project Overview

This repository contains two main parts:

- **backend/** — Node.js + Express API with MongoDB (Mongoose) for authentication and task CRUD.
- **frontend/** — React + Vite SPA that consumes the backend API and provides a simple task dashboard with signup/login.

---

## 🏗 Architecture

### Backend (`backend/`)

- **`server.js`** — Entry point that starts the Express server.
- **`config/db.js`** — MongoDB connection setup.
- **`models/`** — Mongoose schemas for `User` and `Task`.
- **`controllers/`** — Business logic for authentication and task endpoints.
- **`routes/`** — API routing (users and tasks).
- **`middleware/authMiddleware.js`** — JWT authentication middleware protecting task routes.

### Frontend (`frontend/`)

- **`src/main.jsx`** — React app entry point.
- **`src/App.jsx`** — Main router and layout.
- **`src/api/axios.js`** — Axios instance configured to hit the backend.
- **`src/pages/`** — Pages: `Login`, `SignUp`, `Dashboard`.
- **`src/components/`** — UI components: `TaskList`, `TaskForm`, `ProtectedRoute`.

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (>= 18)
- npm (>= 9) or yarn
- MongoDB (local or Atlas)

---

## 🗂 Backend Setup

### 1) Install dependencies

```bash
cd backend
npm install
```

### 2) Configure environment variables

Create a `.env` file in `backend/` with values like:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/task4
JWT_SECRET=your_secret_here
```

> ⚠️ Keep `JWT_SECRET` secret and never commit it to source control.

### 3) Run the server

```bash
npm start
```

By default the API will run at `http://localhost:5000`.

---

## 🧩 Frontend Setup

### 1) Install dependencies

```bash
cd frontend
npm install
```

### 2) Run the dev server

```bash
npm run dev
```

By default the frontend is available at `http://localhost:5173`.

> ✅ The frontend expects the backend API to be running and the base URL is configured in `frontend/src/api/axios.js`.

---

## 🧪 Sample API Documentation

### Authentication

#### Sign Up

**Request**

- Method: `POST`
- URL: `/api/users/signup`
- Body (JSON):

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securePassword123"
}
```

**Response**

- Status: `201`
- Body:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "...",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

---

#### Login

**Request**

- Method: `POST`
- URL: `/api/users/login`
- Body (JSON):

```json
{
  "email": "jane@example.com",
  "password": "securePassword123"
}
```

**Response**

- Status: `200`
- Body:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "...",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

---

### Tasks (Protected)

> All task routes require the `Authorization: Bearer <jwt-token>` header.

#### Get my tasks

**Request**

- Method: `GET`
- URL: `/api/tasks`

**Response**

- Status: `200`
- Body:

```json
[
  {
    "_id": "...",
    "title": "Buy groceries",
    "completed": false,
    "user": "<userId>",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

---

#### Create a task

**Request**

- Method: `POST`
- URL: `/api/tasks`
- Body (JSON):

```json
{
  "title": "Write README"
}
```

**Response**

- Status: `201`
- Body:

```json
{
  "_id": "...",
  "title": "Write README",
  "completed": false,
  "user": "<userId>",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

#### Update a task

**Request**

- Method: `PUT`
- URL: `/api/tasks/:id`
- Body (JSON):

```json
{
  "title": "Write README (updated)",
  "completed": true
}
```

**Response**

- Status: `200`
- Body: updated task object

---

#### Delete a task

**Request**

- Method: `DELETE`
- URL: `/api/tasks/:id`

**Response**

- Status: `200`
- Body:

```json
{
  "message": "Task deleted"
}
```

---

## 🧰 Notes & Tips

- If you change `frontend/src/api/axios.js`, ensure the `baseURL` matches your backend (e.g., `http://localhost:5000`).
- For production, use a real database (MongoDB Atlas or managed service) and secure your JWT secret.

---

## 📌 Useful Commands

### Run both servers (from project root)

```bash
# In one terminal:
cd backend && npm start

# In another terminal:
cd frontend && npm run dev
```

---

Happy hacking! 🎉
