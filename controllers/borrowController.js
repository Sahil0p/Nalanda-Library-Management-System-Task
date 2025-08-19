import Book from "../models/Book.js";
import Borrow from "../models/Borrow.js";
import User from "../models/User.js";
import mongoose from "mongoose";

/** Members borrow a book if copies > 0 */
export const borrowBook = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.params;

  const session = await mongoose.startSession();
  await session.withTransaction(async () => {
    const book = await Book.findById(bookId).session(session);
    if (!book) throw new Error("Book not found");
    if (book.copies <= 0) throw new Error("No copies available");

    // Optional rule: prevent duplicate active borrow of same book by same user
    const active = await Borrow.findOne({ user: userId, book: bookId, returnedAt: null }).session(session);
    if (active) throw new Error("Already borrowed and not returned");

    book.copies -= 1;
    await book.save({ session });
    await Borrow.create([{ user: userId, book: bookId }], { session });
  });

  session.endSession();
  res.status(201).json({ message: "Book borrowed" });
};

export const returnBook = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.params;

  const session = await mongoose.startSession();
  await session.withTransaction(async () => {
    const borrow = await Borrow.findOne({ user: userId, book: bookId, returnedAt: null }).session(session);
    if (!borrow) throw new Error("No active borrow found for this book");

    borrow.returnedAt = new Date();
    await borrow.save({ session });

    const book = await Book.findById(bookId).session(session);
    if (!book) throw new Error("Book not found");
    book.copies += 1;
    await book.save({ session });
  });

  session.endSession();
  res.json({ message: "Book returned" });
};

export const borrowHistory = async (req, res) => {
  const userId = req.user.id;
  const history = await Borrow.find({ user: userId })
    .populate("book")
    .sort({ borrowedAt: -1 });
  res.json(history);
};

/** Reports **/

// 1) Most Borrowed Books
export const mostBorrowedBooks = async (req, res) => {
  const limit = parseInt(req.query.limit || 5);

  const data = await Borrow.aggregate([
    { $group: { _id: "$book", borrowCount: { $sum: 1 } } },
    { $sort: { borrowCount: -1 } },
    { $limit: limit },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "book"
      }
    },
    { $unwind: "$book" },
    {
      $project: {
        _id: 0,
        bookId: "$book._id",
        title: "$book.title",
        author: "$book.author",
        ISBN: "$book.ISBN",
        genre: "$book.genre",
        borrowCount: 1
      }
    }
  ]);

  res.json(data);
};

// 2) Most Active Members
export const activeMembers = async (req, res) => {
  const limit = parseInt(req.query.limit || 5);

  const data = await Borrow.aggregate([
    { $group: { _id: "$user", borrowCount: { $sum: 1 } } },
    { $sort: { borrowCount: -1 } },
    { $limit: limit },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: 0,
        userId: "$user._id",
        name: "$user.name",
        email: "$user.email",
        role: "$user.role",
        borrowCount: 1
      }
    }
  ]);

  res.json(data);
};

// 3) Book Availability Summary
// - `copies` on Book is current available copies
// - activeBorrows per book = borrows where returnedAt == null
// - originalCopies per book = copies + activeBorrows
// - totals across library
export const bookAvailability = async (req, res) => {
  const perBook = await Book.aggregate([
    {
      $lookup: {
        from: "borrows",
        let: { bookId: "$_id" },
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ["$book", "$$bookId"] }, { $eq: ["$returnedAt", null] }] } } },
          { $count: "active" }
        ],
        as: "activeBorrow"
      }
    },
    {
      $addFields: {
        activeBorrowCount: { $ifNull: [{ $arrayElemAt: ["$activeBorrow.active", 0] }, 0] },
        originalCopies: { $add: ["$copies", { $ifNull: [{ $arrayElemAt: ["$activeBorrow.active", 0] }, 0] }] }
      }
    },
    {
      $project: {
        _id: 0,
        bookId: "$_id",
        title: 1,
        available: "$copies",
        activeBorrowed: "$activeBorrowCount",
        original: "$originalCopies"
      }
    }
  ]);

  const totals = perBook.reduce(
    (acc, b) => {
      acc.available += b.available;
      acc.borrowed += b.activeBorrowed;
      acc.original += b.original;
      return acc;
    },
    { available: 0, borrowed: 0, original: 0 }
  );

  res.json({ totals, perBook });
};
