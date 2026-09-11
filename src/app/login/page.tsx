"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { useLocale } from "@/components/locale-provider";
import { demoLoginProfiles } from "@/data/demo-user";

const dict = {
  ru: {
    pressDigits: "Press digits",
    deleteAria: "Delete",
    loginAria: "Sign In",
    eyebrow: "Sign In",
    heading: "Welcome! Sign in to your account.",
    lead: "Select a demo profile or enter your access credentials below.",
    whoAreYou: "Quick Demo Profiles",
    codeLabel: "User Code",
    yourCode: "Your code",
    password: "Password",
    hide: "Hide",
    loginTitle: "Sign In",
    loginSub: "Enter your code and password, then click sign in.",
    buttons: "Keypad",
    writeCode: "Enter code",
    writePassword: "Enter password",
    opening: "Opening...",
    loginAction: "Sign In",
    noCabinet: "Don't have an account yet?",
    create: "Sign Up",
    toHome: "Back to Home",
    loginFailed: "Unable to sign in. Please check credentials.",
  },
  uz: {
    pressDigits: "Raqamlarni bos",
    deleteAria: "Oʻchirish",
    loginAria: "Kirish",
    eyebrow: "Kirish",
    heading: "Salom! Kabinetga kir.",
    lead: "Oʻz tugmangni bos. Kod va parol oʻzi paydo boʻladi.",
    whoAreYou: "Sen kimsan?",
    codeLabel: "Kod",
    yourCode: "Sening koding",
    password: "Parol",
    hide: "Yashirish",
    loginTitle: "Kirish",
    loginSub: "Kod va parolni yoz. Keyin tugmani bos.",
    buttons: "Tugmalar",
    writeCode: "Kodni yoz",
    writePassword: "Parolni yoz",
    opening: "Ochilmoqda...",
    loginAction: "Kirish",
    noCabinet: "Hali kabinet yoʻqmi?",
    create: "Yaratish",
    toHome: "Bosh sahifaga",
    loginFailed: "Tizimga kirib boʻlmadi.",
  },
} as const;

function NumericKeyboard({
  value,
  onChange,
  onSubmit,
  t,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  t: (typeof dict)[keyof typeof dict];
}) {
  function press(digit: string) {
    if (value.length < 6) onChange(value + digit);
  }

  function backspace() {
    onChange(value.slice(0, -1));
  }

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "DEL", "0", "OK"];

  return (
    <div className="numpad">
      <div className="numpad-display">
        {value || <span className="numpad-placeholder">{t.pressDigits}</span>}
      </div>
      <div className="numpad-grid">
        {keys.map((key) => {
          const isBack = key === "DEL";
          const isOk = key === "OK";
          return (
            <button
              key={key}
              type="button"
              className={`numpad-key${isBack ? " numpad-key--back" : ""}${isOk ? " numpad-key--ok" : ""}`}
              onClick={() => {
                if (isBack) backspace();
                else if (isOk) onSubmit();
                else press(key);
              }}
              aria-label={isBack ? t.deleteAria : isOk ? t.loginAria : key}
            >
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const locale = useLocale();
  const t = dict[locale];
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [keyboardTarget, setKeyboardTarget] = useState<"identifier" | "password">("identifier");

  const keyboardValue = keyboardTarget === "identifier" ? identifier : password;

  function goToDashboard() {
    startTransition(() => {
      router.replace("/dashboard");
    });
  }

  function fillDemoCredentials(code: string, demoPassword: string) {
    setIdentifier(code);
    setPassword(demoPassword);
    setError("");
    setShowKeyboard(false);
  }

  async function doLogin() {
    setError("");
    setIsSubmitting(true);
    try {
      await login({ identifier, password });
      goToDashboard();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : t.loginFailed,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void doLogin();
  }

  function handleKeyboardChange(v: string) {
    if (keyboardTarget === "identifier") setIdentifier(v);
    else setPassword(v);
    setError("");
  }

  function handleKeyboardSubmit() {
    if (keyboardTarget === "identifier" && !password) {
      setKeyboardTarget("password");
      setPassword("");
    } else {
      setShowKeyboard(false);
      void doLogin();
    }
  }

  function openKeyboardFor(target: "identifier" | "password") {
    setKeyboardTarget(target);
    setShowKeyboard(true);
  }

  return (
    <main className="auth-service-page">
      <section className="auth-service-shell">
        <div className="auth-service-copy">
          <span className="eyebrow">{t.eyebrow}</span>
          <h1>{t.heading}</h1>
          <p className="auth-service-lead">
            {t.lead}
          </p>

          <div className="auth-service-note auth-service-demo-panel">
            <span>{t.whoAreYou}</span>
            <div className="auth-service-demo-grid">
              {demoLoginProfiles.map((profile) => (
                <button
                  key={profile.code}
                  type="button"
                  className="auth-service-demo-button"
                  onClick={() =>
                    fillDemoCredentials(profile.code, profile.password)
                  }
                >
                  <strong>{profile.label}</strong>
                  <small>{t.codeLabel} {profile.code}</small>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="auth-entry-card">
          {showKeyboard ? (
            <div className="auth-keyboard-view">
              <div className="auth-keyboard-head">
                <p className="lms-kicker">
                  {keyboardTarget === "identifier" ? t.yourCode : t.password}
                </p>
                <button
                  type="button"
                  className="button button-ghost small"
                  onClick={() => setShowKeyboard(false)}
                >
                  {t.hide}
                </button>
              </div>
              <NumericKeyboard
                value={keyboardValue}
                onChange={handleKeyboardChange}
                onSubmit={handleKeyboardSubmit}
                t={t}
              />
              {error ? <p className="form-error">{error}</p> : null}
            </div>
          ) : (
            <>
              <div className="auth-entry-head">
                <h2>{t.loginTitle}</h2>
                <p>{t.loginSub}</p>
              </div>

              <form className="form-shell auth-entry-form" onSubmit={handleSubmit}>
                <div className="field">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <label htmlFor="identifier">{t.yourCode}</label>
                    <button
                      type="button"
                      className="button button-ghost small"
                      onClick={() => openKeyboardFor("identifier")}
                      style={{ fontSize: 12, padding: "2px 8px" }}
                    >
                      {t.buttons}
                    </button>
                  </div>
                  <input
                    id="identifier"
                    type="text"
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                    placeholder={t.writeCode}
                    autoComplete="username"
                  />
                </div>

                <div className="field">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <label htmlFor="password">{t.password}</label>
                    <button
                      type="button"
                      className="button button-ghost small"
                      onClick={() => openKeyboardFor("password")}
                      style={{ fontSize: 12, padding: "2px 8px" }}
                    >
                      {t.buttons}
                    </button>
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder={t.writePassword}
                    autoComplete="current-password"
                  />
                </div>

                {error ? <p className="form-error">{error}</p> : null}

                <button
                  type="submit"
                  className="button button-primary full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t.opening : t.loginAction}
                </button>
              </form>

              <div className="auth-entry-footer">
                <p className="form-helper">
                  {t.noCabinet} <Link href="/register">{t.create}</Link>
                </p>
                <p className="form-helper">
                  <Link href="/">{t.toHome}</Link>
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
