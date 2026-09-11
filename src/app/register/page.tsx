"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { useLocale } from "@/components/locale-provider";
import type { UserProfile, UserRole } from "@/lib/auth-storage";

const emptyProfile: UserProfile = {
  childName: "",
  childClass: "",
  teacherName: "",
  organizationName: "",
  supportNotes: "",
};

type RoleCopy = {
  nameLabel: string;
  namePlaceholder: string;
  childNameLabel?: string;
  childNamePlaceholder?: string;
  showChildFields: boolean;
};

const dict = {
  ru: {
    roleCopy: {
      parent: {
        nameLabel: "Name",
        namePlaceholder: "Write your name",
        childNameLabel: "Child's name",
        childNamePlaceholder: "Write the child's name",
        showChildFields: true,
      },
      teacher: {
        nameLabel: "Name",
        namePlaceholder: "Write your name",
        childNameLabel: "Student name for demo",
        childNamePlaceholder: "Write the student's name",
        showChildFields: true,
      },
      student: {
        nameLabel: "What is your name",
        namePlaceholder: "Write your name",
        childNameLabel: "Name in lessons",
        childNamePlaceholder: "Can it be the same name?",
        showChildFields: true,
      },
      researcher: {
        nameLabel: "Name",
        namePlaceholder: "For example, Olesya Markova",
        showChildFields: false,
      },
    } as Record<UserRole, RoleCopy>,
    consentRequired: "Check the box to continue.",
    createFailed: "Failed to create an account.",
    eyebrow: "New office",
    heading: "Create your own office.",
    lead: "Fill in the fields. It's simple. If you don’t know what to write, ask an adult.",
    whoLabel: "Who are you",
    parentOpt: "Parent",
    studentOpt: "Student",
    teacherOpt: "Teacher",
    researcherOpt: "Researcher",
    emailLabel: "Post office",
    emailPlaceholder: "Write your email",
    passwordLabel: "Password",
    passwordPlaceholder: "Create a password",
    classLabel: "Class",
    classPlaceholder: "For example, 3",
    consentPrefix: "I agree with",
    consentLink: "rules",
    consentSuffix: ".",
    creating: "I create...",
    createButton: "Create an account",
    haveCabinet: "Already have an office?",
    loginLink: "Sign in",
  },
  uz: {
    roleCopy: {
      parent: {
        nameLabel: "Ism",
        namePlaceholder: "Ismni yoz",
        childNameLabel: "Bolaning ismi",
        childNamePlaceholder: "Bolaning ismini yoz",
        showChildFields: true,
      },
      teacher: {
        nameLabel: "Ism",
        namePlaceholder: "Ismni yoz",
        childNameLabel: "Demo uchun oʻquvchining ismi",
        childNamePlaceholder: "Oʻquvchining ismini yoz",
        showChildFields: true,
      },
      student: {
        nameLabel: "Isming nima",
        namePlaceholder: "Ismni yoz",
        childNameLabel: "Darslardagi ism",
        childNamePlaceholder: "Xuddi shu ism boʻlishi mumkin",
        showChildFields: true,
      },
      researcher: {
        nameLabel: "Ism",
        namePlaceholder: "Masalan, Olesya Markova",
        showChildFields: false,
      },
    } as Record<UserRole, RoleCopy>,
    consentRequired: "Davom etish uchun belgini qoʻy.",
    createFailed: "Kabinet yaratib boʻlmadi.",
    eyebrow: "Yangi kabinet",
    heading: "Oʻz kabinetingni yarat.",
    lead: "Maydonlarni toʻldir. Bu oson. Agar nima yozishni bilmasang — kattalardan soʻra.",
    whoLabel: "Sen kimsan",
    parentOpt: "Ota-ona",
    studentOpt: "Oʻquvchi",
    teacherOpt: "Pedagog",
    researcherOpt: "Tadqiqotchi",
    emailLabel: "E-pochta",
    emailPlaceholder: "E-pochtani yoz",
    passwordLabel: "Parol",
    passwordPlaceholder: "Parol oʻylab top",
    classLabel: "Sinf",
    classPlaceholder: "Masalan, 3",
    consentPrefix: "",
    consentLink: "Shartlarga",
    consentSuffix: " roziman.",
    creating: "Yaratilmoqda...",
    createButton: "Kabinet yaratish",
    haveCabinet: "Hisobingiz bormi?",
    loginLink: "Kirish",
  },
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
  const [profile, setProfile] = useState<UserProfile>(emptyProfile);
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
      const created = await register({ name, email, password, role, profile });
      const destination = created.role === "parent" ? "/onboarding/anketa" : "/dashboard";
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

  function updateProfileField<Key extends keyof UserProfile>(
    key: Key,
    value: UserProfile[Key],
  ) {
    setProfile((current) => ({ ...current, [key]: value }));
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
                    value={profile.childName}
                    onChange={(event) => updateProfileField("childName", event.target.value)}
                    placeholder={roleCopy.childNamePlaceholder}
                  />
                </div>

                <div className="field">
                  <label htmlFor="childClass">{t.classLabel}</label>
                  <input
                    id="childClass"
                    type="text"
                    value={profile.childClass}
                    onChange={(event) => updateProfileField("childClass", event.target.value)}
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
