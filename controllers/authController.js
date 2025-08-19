import User from "../models/User.js";
import { signEncryptedToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ error: "Email already registered" });

  const user = await User.create({ name, email, password, role }); // role optional; defaults to Member
  const token = signEncryptedToken({ id: user._id, role: user.role, email: user.email });
  res.status(201).json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const ok = await user.comparePassword(password);
  if (!ok) return res.status(400).json({ error: "Invalid credentials" });

  const token = signEncryptedToken({ id: user._id, role: user.role, email: user.email });
  res.json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token
  });
};
