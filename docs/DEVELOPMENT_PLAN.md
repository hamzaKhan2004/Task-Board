# Task Board – Development Plan

## 1. Objective

Build a simple full-stack Task Board application that allows users to create, view, update and delete tasks across three workflow columns: To Do, In Progress and Done.

## 2. Development Approach

I divided the project into smaller phases to keep the implementation manageable and validate each part before moving forward.

**Phase 1 – Backend Development**

I started with the backend using Node.js, Express and TypeScript. I implemented the REST APIs for creating, retrieving, updating and deleting tasks.

Initially, I used an in-memory data store to focus on API design and CRUD functionality without introducing database configuration.

**Phase 2 – Frontend Development**

After establishing the backend APIs, I developed the React and TypeScript frontend. I implemented the three task columns and connected the frontend with the backend APIs.

**Phase 3 – Drag-and-Drop Functionality**

Once basic CRUD functionality was working, I explored drag-and-drop implementation and added the ability to move tasks between columns.

**Phase 4 – Database Integration**

I explored SQLite to understand its integration with Node.js and SQL-based data operations. I then incorporated database persistence into the application.

## 3. Technical Decisions

- Used TypeScript to maintain type safety across the application.
- Separated backend responsibilities into modular components.
- Developed and tested core functionality before introducing additional features.
- Maintained separate Git branches for stable and ongoing development.

## 4. Scope and Assumptions

- Each task has a unique ID, title, description and status.
- Every task belongs to one of the three predefined statuses.
- No authentication or user management is required.
- Task priorities, deadlines and collaboration features are outside the scope.
- The application focuses on functionality and maintainability rather than extensive visual styling.

## 5. Challenges and Learning

Two areas required additional exploration:

- Drag-and-drop interactions in React and how to synchronize status changes with the backend.
- SQLite integration, including database initialization and executing CRUD queries.

My existing knowledge of SQL fundamentals helped me understand SQLite concepts and integrate them into the project.

## 6. Expected Outcome

Deliver a working full-stack Task Board with REST API integration, task management, drag-and-drop functionality, database persistence and clear documentation.
