# Technical Trade-off

## Decision: SQLite Instead of In-Memory Storage

I initially considered using an in-memory data store because it would make backend development faster and simplify the initial implementation of CRUD operations.

However, in-memory storage loses all task data whenever the server restarts.

I decided to use SQLite instead because it provides persistent storage without requiring a separate database server. It also allowed me to apply my existing SQL knowledge while learning SQLite integration with Node.js.

### Why I selected SQLite

- Persistent data storage.
- Lightweight database setup.
- No separate database server required.
- Familiar SQL-based operations.
- Suitable for the scope of this assignment.

### Alternative Rejected

I rejected keeping the application entirely in-memory because data persistence would be missing.

For a small task management application, SQLite provided a reasonable balance between simplicity and persistence.
