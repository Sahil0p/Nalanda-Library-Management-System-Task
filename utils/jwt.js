import jwt from "jsonwebtoken";
import crypto from "crypto";

const { JWT_SECRET, JWT_EXPIRES_IN, ENC_KEY_BASE64 } = process.env;
if (!JWT_SECRET) throw new Error("JWT_SECRET missing");
if (!ENC_KEY_BASE64) throw new Error("ENC_KEY_BASE64 missing");

const ENC_KEY = Buffer.from(ENC_KEY_BASE64, "base64"); // 32 bytes for AES-256

function encrypt(plaintext) {
  const iv = crypto.randomBytes(12); // GCM nonce
  const cipher = crypto.createCipheriv("aes-256-gcm", ENC_KEY, iv);
  const enc = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  // Pack as base64(iv).base64(tag).base64(ciphertext)
  return [iv.toString("base64"), tag.toString("base64"), enc.toString("base64")].join(".");
}

function decrypt(payload) {
  const [ivB64, tagB64, dataB64] = payload.split(".");
  const iv = Buffer.from(ivB64, "base64");
  const tag = Buffer.from(tagB64, "base64");
  const data = Buffer.from(dataB64, "base64");
  const decipher = crypto.createDecipheriv("aes-256-gcm", ENC_KEY, iv);
  decipher.setAuthTag(tag);
  const dec = Buffer.concat([decipher.update(data), decipher.final()]);
  return dec.toString("utf8");
}

export function signEncryptedToken(payload) {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN || "7d" });
  return encrypt(token);
}

export function verifyEncryptedToken(encryptedToken) {
  const jwtString = decrypt(encryptedToken);
  return jwt.verify(jwtString, JWT_SECRET);
}
