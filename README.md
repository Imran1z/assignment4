# Task Management App

This Task Management App is a simple and intuitive application built with React, Redux, and JWT authentication. It provides users with the ability to manage their tasks effectively. The app supports user sign-up, sign-in, and sign-out functionalities. Once authenticated, users can create, update, and delete their tasks.

# Brief Introduction
The Task Management App leverages modern web development technologies and tools to ensure a smooth and efficient user experience. Here are some of the key aspects:

1. JWT Authentication: The app uses JSON Web Tokens (JWT) to secure user authentication and authorization. This ensures that only authenticated users can access their tasks and perform actions like create, update, and delete.

2. Task Management: Users can add new tasks, edit existing ones, and delete tasks they no longer need. Each task can be marked as complete or incomplete.
 
3. User Authentication: The app includes user sign-up, sign-in, and sign-out functionalities to manage user sessions securely.

4. Modern Tools: The app is built using Vite for fast development, React for the user interface, Redux for state management, and Nodemon to automatically restart the server during development.




# Installation

Clone the repository:



```bash
https://github.com/Imran1z/assignment4
```

Install the dependencies:



```bash
cd frontend
npm install
and
cd backend
npm install

```
# Running the App

Start the development server:
```bash
cd frontend
npm run dev
and
cd backend
nodemon server.js
```

# API Endpoints

## Authentication

1. POST /api/v1/auth/signup: Sign up a new user.

2. POST /api/v1/auth/signin: Sign in a user.

3. POST /api/v1/auth/signout: Sign out the user.

#Tasks

1. GET /api/v1/task/userTask: Fetch all tasks for the signed-in user.

2. POST /api/v1/task/create: Create a new task.

3. PUT /api/v1/task/update/:taskId: Update an existing task.

4. DELETE /api/v1/task/delete/:taskId: Delete a task
