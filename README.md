yarn dev

# Task Management App – Project Documentation

## Overview

This is a full-stack task management application built with **Next.js (App Router)**, **TypeScript**, **MongoDB (via Mongoose)**, and **NextAuth.js** for authentication. The app allows users to register, log in, and manage their personal tasks with CRUD operations, filtering, and pagination.

**Live Demo:**  
Visit [https://task-management-app-ywb9.onrender.com/login](https://task-management-app-ywb9.onrender.com/login) to see the app in action.

---

## 1. Project Structure

```
src/
	app/
		api/
			auth/
				[...nextauth]/route.ts      # NextAuth.js API route
				register/route.ts           # User registration API
			tasks/
				route.ts                    # Tasks list/create API
				[id]/route.ts               # Task update/delete API
		dashboard/page.tsx              # Main dashboard (task list)
		login/page.tsx                  # Login page
		register/page.tsx               # Registration page
		task-form/page.tsx              # Task create/edit page
		layout.tsx                      # Root layout (providers, fonts)
		globals.css                     # Global styles (Tailwind)
		page.tsx                        # Redirects to /login
	components/
		Providers.tsx                   # React Query & Auth providers
		TaskItem.tsx                    # Task display component
		TaskForm.tsx                    # Task create/edit form
		TaskFilters.tsx                 # Search & status filter
		Pagination.tsx                  # Pagination controls
	hooks/
		useAuth.ts                      # Auth hook (NextAuth)
		useTasks.ts                     # Task CRUD hooks (React Query)
	lib/
		db.ts                           # MongoDB connection logic
		authOptions.ts                  # NextAuth config
	models/
		User.ts                         # User Mongoose model
		Task.ts                         # Task Mongoose model
```

---

## 2. Main Features

- **User Authentication:**

  - Register and login with email/password (NextAuth.js, credentials provider).
  - Passwords are hashed with bcryptjs.
  - Session management via JWT.

- **Task Management:**

  - Create, read, update, and delete tasks.
  - Each task belongs to a user.
  - Tasks have title, description, status (pending/done), and timestamps.

- **Filtering & Pagination:**

  - Search tasks by title/description.
  - Filter by status (all/pending/done).
  - Paginated task list (default 5 per page).

- **Modern UI:**
  - Built with React, Tailwind CSS, and Next.js App Router.
  - Responsive, clean, and user-friendly interface.

---

## 3. Architecture & Data Flow

### a. **Authentication**

- **Registration:**

  - `POST /api/auth/register`
    - Receives email & password, checks for existing user, hashes password, creates user in MongoDB.

- **Login:**

  - `POST /api/auth/[...nextauth]`
    - Uses NextAuth.js credentials provider.
    - Validates user and password (bcryptjs).
    - Issues JWT session.

- **Session:**
  - Session info is available via `useSession()` and protected API routes check for valid session.

### b. **Task CRUD APIs**

- **List/Create Tasks:**

  - `GET /api/tasks`
    - Returns paginated, filtered tasks for the logged-in user.
  - `POST /api/tasks`
    - Creates a new task for the user.

- **Update/Delete Task:**

  - `PUT /api/tasks/[id]`
    - Updates a task (title, description, status) if owned by user.
  - `DELETE /api/tasks/[id]`
    - Deletes a task if owned by user.

- **All API routes are protected** (require authentication).

### c. **Database Models**

- **User Model:**
  - Fields: `email`, `password` (hashed), `createdAt`
- **Task Model:**
  - Fields: `user` (ref to User), `title`, `description`, `status`, `createdAt`

### d. **Frontend Logic**

- **Hooks:**

  - `useAuth`: Handles session, signIn, signOut.
  - `useTasks`: Fetches tasks (with filters, pagination), and provides create/update/delete mutations (React Query).

- **Components:**

  - `TaskItem`: Displays a single task with edit/delete.
  - `TaskForm`: Form for creating/editing tasks.
  - `TaskFilters`: Search and status filter controls.
  - `Pagination`: Page navigation.

- **Pages:**

  - `/login`: Login form.
  - `/register`: Registration form.
  - `/dashboard`: Main task list (protected).
  - `/task-form`: Create/edit task (protected).

- **Providers:**
  - `Providers.tsx` wraps the app with NextAuth and React Query providers.

---

## 4. Deployment

- **Environment Variables:**

  - `MONGODB_URI`: MongoDB connection string.
  - `NEXTAUTH_SECRET`: Secret for NextAuth JWT.
  - `NEXTAUTH_URL`: Base URL for NextAuth.

- **Production:**
  - Deployed on Render.com (see live demo link above).
  - Uses environment variables for secure config.

---

## 5. How to Use

1. **Register** a new account.
2. **Login** with your credentials.
3. **Create, edit, delete, and filter tasks** from your dashboard.
4. **Logout** when done.

---

## 6. Live Demo

**See the app live:**  
👉 [https://task-management-app-ywb9.onrender.com/login](https://task-management-app-ywb9.onrender.com/login)

---

**Explore the code, try the demo, and feel free to extend the app for your needs!**
