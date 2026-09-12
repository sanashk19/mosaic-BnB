import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { CurrentUser } from "@/lib/uquvli-types";
import { findUserById } from "@/lib/server/uquvli-store";

const SESSION_COOKIE = "uquvli-session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET || process.env.UQUVLI_SESSION_SECRET;
  if (secret) return secret;

  if (process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET must be set in production.");
  }

  return "uquvli-local-session-secret";
}

function toBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function fromBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(payload: string) {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
}

function createSessionToken(userId: string) {
  const issuedAt = Date.now().toString();
  const payload = `${toBase64Url(userId)}.${issuedAt}`;
  return `${payload}.${sign(payload)}`;
}

function verifySessionToken(token: string): string | null {
  const [encodedUserId, issuedAt, signature] = token.split(".");
  if (!encodedUserId || !issuedAt || !signature) return null;

  const payload = `${encodedUserId}.${issuedAt}`;
  const expected = sign(payload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    actualBuffer.length !== expectedBuffer.length
    || !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return null;
  }

  const issuedAtNumber = Number(issuedAt);
  if (!Number.isFinite(issuedAtNumber)) return null;
  if (Date.now() - issuedAtNumber > SESSION_MAX_AGE * 1000) return null;

  return fromBase64Url(encodedUserId);
}

export async function getSessionUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const userId = verifySessionToken(token);
  return userId ? findUserById(userId) : null;
}

export async function setSessionUser(userId: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createSessionToken(userId), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearSessionUser() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
