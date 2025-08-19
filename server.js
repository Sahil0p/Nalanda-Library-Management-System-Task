import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";
import "express-async-errors";

const app = express();
app.use(cors());
app.use(express.json());

// REST routes
app.use("/api", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api", borrowRoutes);

// GraphQL (+ auth via context)


const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    });

    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((e) => {
    console.error("Failed to start", e);
    process.exit(1);
  });

//   app.get('/', (req, res) => {
//     res.send('API is running...');
//   });
  