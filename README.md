# AdminPulse Dashboard

A **fresher-friendly full stack admin dashboard** built with **React + TypeScript + Vite + Tailwind CSS** (frontend) and **Java Spring Boot + MySQL** (backend). Suitable for resumes, portfolios, and Java full stack interviews.

---

## Features

| Feature | Description |
|---------|-------------|
| Dashboard | Stats cards, revenue chart, recent activity |
| User Management | CRUD + search by name/email |
| Analytics | Growth metrics and revenue overview |
| Settings | Admin profile and preferences |
| Login | Basic auth flow with token in localStorage |
| Responsive UI | Sidebar, navbar, mobile layout |

---

## Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Router, Axios, Recharts  

**Backend:** Java 17, Spring Boot 3, Spring Data JPA, Spring Security (open API for learning), MySQL  

---

## Project Structure

```
AdminPulse/
├── adminpulse-frontend/          # React + Vite app
│   ├── src/
│   │   ├── api/                  # Axios config, API calls, dummy data
│   │   ├── components/           # Reusable UI (Sidebar, Navbar, tables, charts)
│   │   ├── layouts/              # Dashboard layout wrapper
│   │   ├── pages/                # Login, Dashboard, Users, Analytics, Settings
│   │   └── types/                # TypeScript interfaces
│   └── package.json
│
├── adminpulse-backend/           # Spring Boot REST API
│   └── src/main/java/com/adminpulse/
│       ├── config/               # Security, sample data loader
│       ├── controller/           # REST endpoints
│       ├── service/              # Business logic
│       ├── repository/           # JPA repositories
│       └── model/                # Entity classes (User, Admin, Activity)
│
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login with email & password |
| GET | `/api/auth/profile?email=` | Get admin profile |
| GET | `/api/users` | List all users |
| GET | `/api/users?search=` | Search users |
| GET | `/api/users/{id}` | Get user by ID |
| POST | `/api/users` | Create user |
| PUT | `/api/users/{id}` | Update user |
| DELETE | `/api/users/{id}` | Delete user |
| GET | `/api/dashboard/stats` | Dashboard statistics |
| GET | `/api/dashboard/revenue` | Monthly revenue data |
| GET | `/api/activities` | Recent activities (last 10) |

---

## Database Schema (MySQL)

```sql
CREATE DATABASE adminpulse_db;
USE adminpulse_db;

-- See full script: adminpulse-backend/src/main/resources/schema.sql
```

**Tables:**
- `admins` — admin login accounts
- `users` — managed users (name, email, role, status)
- `activities` — audit-style activity log

**Default login:**
- Email: `admin@adminpulse.com`
- Password: `admin123`

---

## Prerequisites

- Node.js 18+
- Java JDK 17+
- Maven 3.8+
- MySQL 8+

---

## Setup Instructions

### 1. MySQL

1. Start MySQL server.
2. Create database (optional — Spring can create it via URL):
   ```sql
   CREATE DATABASE adminpulse_db;
   ```
3. Update credentials in `adminpulse-backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=YOUR_PASSWORD
   ```

### 2. Backend

```bash
cd adminpulse-backend
mvn spring-boot:run
```

API runs at: **http://localhost:8080**

### 3. Frontend

From **project root** (recommended):

```bash
npm install --prefix adminpulse-frontend
npm run dev
```

Or from the frontend folder:

```bash
cd adminpulse-frontend
npm install
npm run dev
```

App runs at: **http://localhost:5173**

> If the backend is offline, the UI still works using **dummy data** and demo login.

---

## Resume Highlights

You can mention on your resume:

- Built a **full stack admin dashboard** with React and Spring Boot
- Implemented **REST APIs** with layered architecture (Controller → Service → Repository)
- Integrated frontend with backend using **Axios**
- Performed **CRUD operations** for user management
- Designed **responsive dark-theme UI** with Tailwind CSS
- Added **authentication structure** (login + token storage)
- Used **MySQL** with JPA entities and relationships

---

## Interview Talking Points

1. **Architecture:** Explain MVC on backend and component-based structure on frontend.
2. **CRUD flow:** User clicks Add → React form → POST `/api/users` → Service → Repository → MySQL.
3. **Auth:** Login returns a token; frontend stores it in `localStorage` (mention BCrypt/JWT as future improvement).
4. **State:** React `useState` + `useEffect` for data fetching (no Redux — keeps it beginner-friendly).
5. **CORS:** `@CrossOrigin` on controllers for local dev.

---

## Future Improvements (Optional)

- Password hashing with BCrypt
- JWT-based authentication
- Pagination for user table
- Form validation library (e.g. React Hook Form)
- Unit tests with JUnit and Vitest

---

## Author

Built as a **student / fresher portfolio project** for Java Full Stack Development learning.

**Project Name:** AdminPulse Dashboard
