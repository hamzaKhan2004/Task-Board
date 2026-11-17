# Task Board

A simple full-stack Task Board application built with React, TypeScript, Node.js and Express.

The application allows users to manage tasks across three workflow stages: To Do, In Progress and Done.

## Features

- Create and delete tasks.
- View tasks organized by status.
- Move tasks between columns.
- Drag-and-drop task management.
- REST API integration.
- Persistent task storage using SQLite.

## Tech Stack

**Frontend**

- React.js
- TypeScript
- Vite

**Backend**

- Node.js
- Express.js
- TypeScript

**Database**

- SQLite

## Project Structure

```text
task-board/
├── frontend/
├── backend/
├── docs/
│   ├── DEVELOPMENT_PLAN.md
│   └── TRADE_OFFS.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd task-board
```

### 2. Setup the backend

```bash
cd backend
npm install
```

Configure the required environment variables as described in the backend environment example file, if applicable.

Start the backend:

```bash
npm run dev
```

### 3. Setup the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite.

## API Endpoints

| Method | Endpoint         | Description                |
| ------ | ---------------- | -------------------------- |
| POST   | `/api/tasks`     | Create a task              |
| GET    | `/api/tasks`     | Retrieve all tasks         |
| GET    | `/api/tasks/:id` | Retrieve a task            |
| PATCH  | `/api/tasks/:id` | Update task details/status |
| DELETE | `/api/tasks/:id` | Delete a task              |

## Task Statuses

- `to-do`
- `in-progress`
- `done`

## Future Improvements

With more development time, I would add automated backend and frontend tests, improve validation and introduce better error handling for failed operations.

## Author

Hamza Khan

[GitHub](https://github.com/hamzaKhan2004) · [Portfolio](https://portfolio-z9dz.onrender.com/)
