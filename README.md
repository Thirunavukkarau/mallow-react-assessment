# React User Management App

A single-page application (SPA) built with **React**, **Redux Toolkit**, **React Router**, and **Material UI**.  
This project is part of a developer assessment and demonstrates key frontend skills including API integration, state management, routing, form validation, modern ES6+ usage, and UI handling.

---


### 1. Login System
- Email & password validation
- API-based authentication (`https://reqres.in/api/login`)
- Loading state during login
- Stores token using Redux + localStorage
- Redirects to Users page after successful login

### 2. Users List Page
- Fetches users from API: `https://reqres.in/api/users?page=1`
- Redux Thunk used for async calls
- Shows loader while data is being fetched
- Display users in table / card format (Material UI)
- Error handling included

### 3. User Details Page
- Dynamic route: `/users/:id`
- Fetches a single user’s details
- UI shows avatar, name, email, etc.

### 4. Routing (React Router v6)
- `/login`
- `/users`
- `/users/:id`
- Protected Routes (redirect if token missing)

### 5. Redux Toolkit
State management for:
- Authentication
- User list
- User details
- Loading & error states

###  6. Validations
- Email format validation
- Required field validation
- Password length validation

### 7. Modern ES6+ Usage
- Arrow functions
- Async/await
- Hooks (useState, useEffect, useDispatch, useSelector)
- Optional chaining
- Template literals

---

## 🛠️ Tech Stack

| Technology | Usage |
|-----------|--------|
| **React** | Frontend UI |
| **Redux Toolkit** | State management |
| **React Router v6** | Navigation + protected routes |
| **Material UI (MUI)** | UI components |
| **ReqRes API** | Dummy API for login & users |
| **ES6+** | Modern JavaScript features |

---
