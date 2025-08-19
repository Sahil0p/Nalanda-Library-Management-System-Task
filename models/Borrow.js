import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    borrowedAt: { type: Date, default: Date.now },
    returnedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

borrowSchema.index({ user: 1, book: 1, returnedAt: 1 });

export default mongoose.model("Borrow", borrowSchema);
