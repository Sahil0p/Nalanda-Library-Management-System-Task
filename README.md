# Nalanda-Library-Management-System-Task
A Node.js + Express.js + MongoDB based Library Management System.
This project supports authentication, book management, and borrowing features with role-based access control (Admin / Member).

🚀 Features

User Authentication (JWT-based login & registration)

Role-based Access Control (Admin vs Member)

Book Management (Add, update, delete, list books — Admin only)

Borrowing System (Members can borrow/return books)

Admin Controls (Track borrowed books, view borrowing statistics)

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: MongoDB with Mongoose

Authentication: JWT (JSON Web Token)

API Testing: Postman

📂 Project Structure
.
├── config
│   └── db.js
├── controllers
│   ├── authController.js
│   ├── bookController.js
│   └── borrowController.js
├── middleware
│   └── auth.js
├── models
│   ├── Book.js
│   ├── Borrow.js
│   └── User.js
├── routes
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── borrowRoutes.js
├── utils
│   └── jwt.js
├── server.js
├── package.json
└── .env

⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables (.env)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4️⃣ Start the Server
npm start


Server will run at:
👉 http://localhost:5000

🔑 Authentication & Role Usage

Admin Token:

Required for adding/updating/deleting books.

Required for viewing borrowed books & statistics.

Member Token:

Required for borrowing/returning books.

👉 Important: While testing in Postman:

Switch to Admin Bearer Token for book-related actions.

Switch to Member Bearer Token for borrowing actions.

To check borrow statistics again, switch back to Admin Token.

📬 API Endpoints
Auth

POST /api/auth/register → Register (Admin/Member)

POST /api/auth/login → Login & get JWT

Books (Admin only)

POST /api/books → Add a book

GET /api/books → Get all books

PUT /api/books/:id → Update book

DELETE /api/books/:id → Delete book

Borrowing

POST /api/borrow → Borrow a book (Member only)

POST /api/borrow/return/:id → Return a book (Member only)

GET /api/borrow → Get all borrow records (Admin only)

🧪 Postman Collection

A complete Postman Collection with all APIs is included in the repo:

📁 Library.postman_collection.json

👉 Import into Postman and test APIs with proper token switching (Admin ↔ Member).
