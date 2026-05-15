import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set");
}

const key = new TextEncoder().encode(process.env.JWT_SECRET);

async function encrypt(payload: Record<string, unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30m")
    .sign(key);
}

export async function decrypt(input: string): Promise<Record<string, unknown>> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(password: string) {
  const adminPassword = process.env.SECRET_KEY;
  if (!adminPassword) return false;

  // Timing-safe comparison to prevent timing attacks
  const inputBuffer = Buffer.from(password);
  const secretBuffer = Buffer.from(adminPassword);
  if (
    inputBuffer.length !== secretBuffer.length ||
    !crypto.timingSafeEqual(inputBuffer, secretBuffer)
  ) {
    return false;
  }

  // Create the session
  const expires = new Date(Date.now() + 30 * 60 * 1000);
  const session = await encrypt({ role: "admin", expires });

  // Save the session in a cookie
  const cookieStore = await cookies();
  cookieStore.set("admin_session", session, { 
    expires, 
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/"
  });

  return true;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (!session) return null;
  
  try {
    const decrypted = await decrypt(session);
    // Check if the session has expired manually just in case
    const expires = decrypted.expires;
    if (expires && (typeof expires === 'string' || typeof expires === 'number') && new Date(expires) < new Date()) {
      return null;
    }
    return decrypted;
  } catch (error) {
    return null;
  }
}
