import { Router } from "express";
import { addBook, updateBook, deleteBook, listBooks } from "../controllers/bookController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/", auth("Admin"), addBook);
router.put("/:id", auth("Admin"), updateBook);
router.delete("/:id", auth("Admin"), deleteBook);
router.get("/", listBooks);

export default router;
