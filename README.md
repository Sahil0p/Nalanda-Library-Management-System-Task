# Nalanda-Library-Management-System-Task

A simple Library Management System built with Node.js, Express, and MongoDB.
This project allows admins to manage books and members, while users (members) can borrow and return books.
Authentication and authorization are handled using JWT (Bearer Tokens).

---

## 🚀 Features

-👤 Authentication & Authorization

-- Login as Admin or Member

-- JWT-based authentication

-- Role-based access (Admin vs Member)

📖 Book Management (Admin only)

Add new books

Update existing books

Delete books

View all books

📚 Borrowing System (Member only)

Borrow a book

Return a book

View borrowing history

Limit on borrowing multiple copies

🛡️ Role Restrictions

Switch to Admin token to test Admin APIs

Switch to Member token to test Borrow/Return APIs

To check borrowing records or book statistics → switch back to Admin token

