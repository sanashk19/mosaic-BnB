"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { useLocale } from "@/components/locale-provider";
import type { UserProfile, UserRole } from "@/lib/auth-storage";

type RoleCopy = {
  nameLabel: string;
  namePlaceholder: string;
  childNameLabel?: string;
  childNamePlaceholder?: string;
  showChildFields: boolean;
};

const englishRegisterDict = {
  roleCopy: {
    parent: {
      nameLabel: "Your name",
      namePlaceholder: "Enter your full name",
      childNameLabel: "Child's name",
      childNamePlaceholder: "Enter your child's name",
      showChildFields: true,
    },
    teacher: {
      nameLabel: "Your name",
      namePlaceholder: "Enter your name",
      childNameLabel: "Student name for demo",
      childNamePlaceholder: "Enter student name",
      showChildFields: true,
    },
    student: {
      nameLabel: "Your name",
      namePlaceholder: "Enter your name",
      childNameLabel: "Display name",
      childNamePlaceholder: "Name shown in lessons",
      showChildFields: true,
    },
    researcher: {
      nameLabel: "Your name",
      namePlaceholder: "Enter your full name",
      showChildFields: false,
    },
  } as Record<UserRole, RoleCopy>,
  consentRequired: "Please accept the terms to continue.",
  createFailed: "Failed to create account. Please try again.",
  eyebrow: "Sign Up",
  heading: "Create your Mosaic account.",
  lead: "Fill in the fields below to get started with Mosaic.",
  whoLabel: "I am a...",
  parentOpt: "Parent",
  studentOpt: "Student",
  teacherOpt: "Teacher",
  researcherOpt: "Researcher",
  emailLabel: "Email address",
  emailPlaceholder: "Enter your email",
  passwordLabel: "Password",
  passwordPlaceholder: "Create a password",
  classLabel: "Grade / Class",
  classPlaceholder: "e.g. Grade 3",
  consentPrefix: "I agree with the",
  consentLink: "terms and privacy policy",
  consentSuffix: ".",
  creating: "Creating account...",
  createButton: "Create account",
  haveCabinet: "Already have an account?",
  loginLink: "Sign in",
};

const dict = {
  ru: englishRegisterDict,
  uz: englishRegisterDict,
} as const;

export default function RegisterPage() {
  const router = useRouter();
  const { ready, register, user } = useAuth();
  const locale = useLocale();
  const t = dict[locale];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("parent");
  const [childName, setChildName] = useState("");
  const [childClass, setChildClass] = useState("");
  const [acceptedConsent, setAcceptedConsent] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const roleCopy = t.roleCopy[role];

  useEffect(() => {
    if (ready && user) {
      router.replace("/dashboard");
    }
  }, [ready, router, user]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!acceptedConsent) {
      setError(t.consentRequired);
      return;
    }

    setIsSubmitting(true);

    try {
      const profile: UserProfile = {
        childName: childName.trim(),
        childClass: childClass.trim(),
        teacherName: "",
        organizationName: "",
        supportNotes: "",
      };

      await register({ name, email, password, role, profile });
      const destination = "/dashboard";
      startTransition(() => {
        router.push(destination);
      });
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : t.createFailed,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page auth-page">
      <section className="auth-layout">
        <div className="auth-side">
          <span className="eyebrow">{t.eyebrow}</span>
          <h1>{t.heading}</h1>
          <p>
            {t.lead}
          </p>
        </div>

        <div className="auth-card">
          <form className="form-shell" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="role">{t.whoLabel}</label>
              <select
                id="role"
                value={role}
                onChange={(event) => setRole(event.target.value as UserRole)}
              >
                <option value="parent">{t.parentOpt}</option>
                <option value="student">{t.studentOpt}</option>
                <option value="teacher">{t.teacherOpt}</option>
                <option value="researcher">{t.researcherOpt}</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="name">{roleCopy.nameLabel}</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={roleCopy.namePlaceholder}
                autoComplete="name"
              />
            </div>

            <div className="field">
              <label htmlFor="register-email">{t.emailLabel}</label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t.emailPlaceholder}
                autoComplete="email"
              />
            </div>

            <div className="field">
              <label htmlFor="register-password">{t.passwordLabel}</label>
              <input
                id="register-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={t.passwordPlaceholder}
                autoComplete="new-password"
              />
            </div>

            {roleCopy.showChildFields ? (
              <>
                <div className="field">
                  <label htmlFor="childName">{roleCopy.childNameLabel}</label>
                  <input
                    id="childName"
                    type="text"
                    value={childName}
                    onChange={(event) => setChildName(event.target.value)}
                    placeholder={roleCopy.childNamePlaceholder}
                  />
                </div>

                <div className="field">
                  <label htmlFor="childClass">{t.classLabel}</label>
                  <input
                    id="childClass"
                    type="text"
                    value={childClass}
                    onChange={(event) => setChildClass(event.target.value)}
                    placeholder={t.classPlaceholder}
                  />
                </div>
              </>
            ) : null}

            <label className="consent-field" htmlFor="acceptedConsent">
              <input
                id="acceptedConsent"
                type="checkbox"
                checked={acceptedConsent}
                onChange={(event) => setAcceptedConsent(event.target.checked)}
              />
              <span className="consent-copy">
                {t.consentPrefix}<Link href="/terms">{t.consentLink}</Link>{t.consentSuffix}
              </span>
            </label>

            {error ? <p className="form-error">{error}</p> : null}

            <button
              type="submit"
              className="button button-primary full"
              disabled={isSubmitting}
            >
              {isSubmitting ? t.creating : t.createButton}
            </button>
          </form>

          <p className="form-helper">
            {t.haveCabinet} <Link href="/login">{t.loginLink}</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
