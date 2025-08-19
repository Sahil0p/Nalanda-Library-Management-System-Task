# 📚 Nalanda Library Management System

---

## 🔧 Features
- 👩‍🏫 **User Roles** – Admin, Librarian, and Student access levels  
- 📖 **Book Management** – Add, update, delete, and search books  
- 🧑‍💻 **User Management** – Manage library members and their profiles  
- 📅 **Borrow & Return** – Track issued books with due dates  
- 🔍 **Search & Filter** – Quickly find books by title, author, or category  
- 📊 **Reports** – Generate borrowing history and availability reports  

---

## 🛠️ Technologies Used
- ✅ **HTML5, CSS3, JavaScript** – Frontend structure and interactions  
- ✅ **Node.js + Express.js** – Backend server and API handling  
- ✅ **MongoDB** – Database for storing users & books  
- ✅ **Mongoose** – Database ORM for easy queries  
- ✅ **Git & GitHub** – Version control and collaboration
- ✅ **Postman** – API Endpoints  

---

## 📂 File Structure
```plaintext
nalanda-library-management-system/
├── server.js                 # Express server entry point
│── config                    # DB connection & environment setup
|   |──db.js
│── routes/                   # API routes (books, users, borrow)
|   |──authRoutes.js
|   |──bookRoutes.js
|   |──borrowRoutes.js
│── models/                   # Database schemas
|   |──Books.js
|   |──Borrow.js
|   |──User.js
│── controllers/              # Business logic for routes
|   |──authController.js
|   |──bookController.js
|   |──borrowController.js
│── utils/                    # JWT Tokens
|   |──jwt.js
│
├── .env                      # Example environment variables
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation (this file)
