import Book from "../models/Book.js";

export const addBook = async (req, res) => {
  const { title, author, ISBN, publicationDate, genre, copies } = req.body;
  console.log(title)
  const exists = await Book.findOne({ ISBN });
  if (exists) return res.status(409).json({ error: "ISBN already exists" });
  const book = await Book.create({ title, author, ISBN, publicationDate, genre, copies });
  res.status(201).json(book);
};

export const updateBook = async (req, res) => {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ error: "Book not found" });
  res.json(updated);
};

export const deleteBook = async (req, res) => {
  const deleted = await Book.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Book not found" });
  res.json({ message: "Book deleted" });
};

export const listBooks = async (req, res) => {
  const { page = 1, limit = 10, genre, author, title } = req.query;
  const q = {};
  if (genre) q.genre = genre;
  if (author) q.author = new RegExp(author, "i");
  if (title) q.title = new RegExp(title, "i");

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [items, total] = await Promise.all([
    Book.find(q).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
    Book.countDocuments(q)
  ]);

  res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
};
