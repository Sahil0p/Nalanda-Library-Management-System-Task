import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    ISBN: { type: String, required: true, unique: true, trim: true },
    publicationDate: { type: Date, required: true },
    genre: { type: String, required: true, trim: true },
    // `copies` represents CURRENT available copies
    copies: { type: Number, default: 1, min: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
