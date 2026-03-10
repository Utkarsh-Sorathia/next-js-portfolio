import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.JWT_SECRET || "fallback-secret-at-least-thirty-two-chars-long";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30m")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(password: string) {
  // Comparing with SECRET_KEY from env as the admin password
  if (password !== process.env.SECRET_KEY) {
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
    if (decrypted && decrypted.expires && new Date(decrypted.expires) < new Date()) {
      return null;
    }
    return decrypted;
  } catch (error) {
    return null;
  }
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("admin_session")?.value;
  if (!session) return null;

  try {
    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 30 * 60 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
      name: "admin_session",
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/"
    });
    return res;
  } catch (error) {
    return null;
  }
}
