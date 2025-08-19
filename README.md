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
├── server.js 
│── server.js          # Express server entry point
│   ├── routes/            # API routes (books, users, borrow)
│   ├── models/            # Database schemas
│   ├── controllers/       # Business logic for routes
│   └── config/            # DB connection & environment setup
│
├── .env                   # Example environment variables
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation (this file)
