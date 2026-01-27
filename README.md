# MORINGA – React Full Stack Final Project

This project was built as a final project for a React course.

The application represents a real-world business ecosystem:  
**Pharmacy · Café · Bakery · Restaurant · Market**

Currently, the **Pharmacy section is fully functional**, including product browsing,
shopping cart, checkout, and order management.  
Other sections are presented as UI demos for future expansion.

---

## Features

- React client built with Vite
- Multiple pages with React Router
- Redux Toolkit for cart and favorites state
- Custom hooks (`useFetch`, `useLocalStorage`)
- Shopping cart with quantity control
- Checkout flow with order creation
- Orders management page with full CRUD (Create / Read / Update / Delete)
- External API integration (Offers page)
- Loading, error, and empty states handling
- Node.js + Express server
- MongoDB database (real persistence)

---

## Technologies

### Frontend
- React
- Vite
- React Router
- Redux Toolkit
- Custom Hooks
- CSS (page-based styling)

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- REST API
- Layered architecture  
  (routes / controllers / services / repositories)

---

## Project Structure

```txt
program1/
├─ src/        # React client
├─ server/     # Express + MongoDB API
├─ README.md
└─ .env.example
```

## How to Run the Project
1️⃣ Server (API)
cd server
npm install
npm run dev
The server runs on:

http://localhost:5000
2️⃣ Client (React)
cd src
npm install
npm run dev
The client runs on:

http://localhost:5173
Environment Variables
Create a .env file inside the server folder
(use .env.example as reference):

PORT=5000
MONGO_URI=your_mongodb_connection_string
⚠️ Do not commit the real .env file.

Notes
Orders are stored in MongoDB (real database, not in-memory).

The Orders page demonstrates full CRUD functionality.

Local storage is used for theme persistence.

Error handling is implemented on both client and server.

