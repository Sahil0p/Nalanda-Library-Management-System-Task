import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
  borrowBook,
  returnBook,
  borrowHistory,
  mostBorrowedBooks,
  activeMembers,
  bookAvailability
} from "../controllers/borrowController.js";

const router = Router();

// Member actions
router.post("/borrow/:bookId", auth("Member"), borrowBook);
router.post("/return/:bookId", auth("Member"), returnBook);
router.get("/history", auth("Member"), borrowHistory);

// Admin reports
router.get("/reports/most-borrowed", auth("Admin"), mostBorrowedBooks);
router.get("/reports/active-members", auth("Admin"), activeMembers);
router.get("/reports/availability", auth("Admin"), bookAvailability);

export default router;
