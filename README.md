# 📘 JobAssignment – Full Stack Job Portal

A complete job search platform built using Next.js (App Router) on the frontend and Node.js + Express + MongoDB on the backend.

Supports search, filtering, pagination, job details, saved jobs, and includes 50 demo seeded jobs.

## 📁 Project Structure

```
JobAssignment/
│
├── backend/           # Express.js + MongoDB API
│   ├── model/
│   ├── routes/
│   ├── seed.js
│   ├── .env.example
│   └── package.json
│
└── frontend/          # Next.js (App Router) + TailwindCSS
    ├── app/
    ├── components/
    ├── hook/
    ├── .env.example
    └── package.json
```

## 🚀 Getting Started

This guide explains how to run backend and frontend locally.

### 🖥️ Backend Setup (Express + MongoDB)

#### 1️⃣ Navigate to backend directory

```bash
cd JobAssignment/backend
```

#### 2️⃣ Create environment file

Copy `.env.example` → `.env`:

```bash
cp .env.example .env
```

Open `.env` and configure values:

```env
MONGO_URI=mongodb://127.0.0.1:27017/jobassignment
PORT=4000
```

#### 3️⃣ Install dependencies

```bash
npm install
```

#### 4️⃣ Seed 50 Demo Jobs

This inserts 50 sample job entries into MongoDB.

```bash
npm run seed
```

If successful:

```
✔ Seed completed successfully: 50 jobs created
```

#### 5️⃣ Start the backend server

```bash
npm run dev
```

Backend runs at:  
👉 **http://localhost:4000**

---

### 🎨 Frontend Setup (Next.js + TailwindCSS)

#### 1️⃣ Navigate to frontend directory

```bash
cd JobAssignment/frontend
```

#### 2️⃣ Create environment file

Copy `.env.example` → `.env`:

```bash
cp .env.example .env
```

Add backend API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

#### 3️⃣ Install dependencies

```bash
npm install
```

#### 4️⃣ Run Next.js development server

```bash
npm run dev
```

Frontend runs at:  
👉 **http://localhost:3000**

---

## 🌟 Features

### Frontend (Next.js)

- Figma-accurate, pixel-perfect UI
- **Search by:**
  - Job title
  - Company
  - Skills
  - Location
- **Fully functional filters:**
  - Location
  - Experience
  - Salary
  - Job Type
  - Industry
  - Function
  - Full Stack
- Dynamic job listings
- Responsive design
- Local fallback jobs if backend is down
- Paginated job listing with server-side filtering

### Backend (Express + MongoDB)

- REST API for job listings
- **Supports:**
  - Filtering
  - Searching
  - Pagination
- **Job Schema includes:**
  - `role`
  - `company`
  - `description`
  - `salary`
  - `location`
  - `experience`
  - `industry`
  - `function`
  - `skills[]`
  - `jobType`
  - `fullStack`
  - `saved`
  - `postedAt`
  - `applicants`
  - `createdAt`
- Includes `seed.js` to auto-generate 50 demo jobs

---

## 🔌 API Endpoints

| Method | Route                  | Description                    |
|--------|------------------------|--------------------------------|
| GET    | `/api/jobs`            | Get jobs + filters + pagination|
| GET    | `/api/jobs/:id`        | Get job details                |
| POST   | `/api/jobs`            | Create a new job               |
| POST   | `/api/jobs/:id/save`   | Toggle job saved/unsaved       |

---

## 🧪 Seeding Jobs

Run:

```bash
npm run seed
```

This will:
- Delete existing jobs
- Insert 50 fresh demo jobs
- Populate skills, postedAt, applicants, etc.

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- React
- TailwindCSS
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose

---

## 🟩 Running Both Apps Together

**Terminal 1 — Backend**

```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend**

```bash
cd frontend
npm run dev
```

---


## 👨‍💻 Author

Sachin Kumar Jha