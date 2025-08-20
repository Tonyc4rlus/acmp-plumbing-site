// lib/auth.ts
import jwt from "jsonwebtoken";

export const adminCookieName = "acmp_admin"; // <- usado pelos routes

const SECRET = process.env.JWT_SECRET || "change-me";

// Gera um token de sessão para o admin
export function createSession() {
  return jwt.sign({ role: "admin" }, SECRET, { expiresIn: "7d" });
}

// Verifica se o token é válido e tem papel de admin
export function verifySession(token: string) {
  try {
    const payload = jwt.verify(token, SECRET) as any;
    return payload?.role === "admin";
  } catch {
    return false;
  }
}
