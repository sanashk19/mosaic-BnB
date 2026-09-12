"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { StudentTaskPanel, type StudentTaskPanelAnswer } from "@/components/student-task-panel";
import { TrainerFeedbackOverlay } from "@/components/trainers/trainer-feedback-overlay";
import { CabinetIcon, UiIcon, type UiIconName } from "@/components/ui-icons";
import type { MyGovTrainer as MyGovTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: MyGovTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Step = "home" | "services" | "form" | "sms" | "done";

function serviceIconName(title: string): UiIconName {
  if (title.includes("doctor") || title.includes("medic") || title.includes("Polyclinic") || title.includes("Medic") || title.includes("Polyclinic") || title.includes("shifokor") || title.includes("Shifokor") || title.includes("tibbiy")) return "health";
  if (title.includes("transport") || title.includes("transport")) return "route";
  if (title.includes("order") || title.includes("soliq")) return "services";
  if (title.includes("affairs") || title.includes("maʼlumotnoma")) return "certificate";
  if (title.includes("Complaints") || title.includes("shelf") || title.includes("Shikoyat") || title.includes("politsiya")) return "shield";
  if (title.includes("School") || title.includes("register") || title.includes("Record") || title.includes("Maktab") || title.includes("yozilish")) return "school";
  if (title.includes("REGISTER") || title.includes("born") || title.includes("FHDYo") || title.includes("tugʻil")) return "users";
  if (title.includes("card") || title.includes("Order") || title.includes("karta") || title.includes("Buyurtma")) return "shopping";
  if (title.includes("passport") || title.includes("Received") || title.includes("Pasport") || title.includes("olish")) return "shield";
  return "services";
}

const categoriesByLocale: Record<Locale, Array<{ label: string; icon: UiIconName; count: number }>> = {
  ru: [
    { label: "Health", icon: "health", count: 42 },
    { label: "Documents", icon: "certificate", count: 76 },
    { label: "Education", icon: "school", count: 58 },
    { label: "Taxes", icon: "services", count: 31 },
  ],
  uz: [
    { label: "Salomatlik", icon: "health", count: 42 },
    { label: "Hujjatlar", icon: "certificate", count: 76 },
    { label: "Taʼlim", icon: "school", count: 58 },
    { label: "Soliqlar", icon: "services", count: 31 },
  ],
};

const dict = {
  ru: {
    timeNow: "09:42",
    brandTitle: "my.gov.uz",
    brandSub: "Electronic government",
    avatarLetter: "AND",
    taskLabel: "Exercise:",
    searchPlaceholder: "Find a service...",
    categoriesTitle: "Categories",
    popularTitle: "Popular",
    popularDoctor: "Make an appointment with a doctor",
    popularCert: "Inquiries",
    popularAll: "All services",
    backHome: "Home",
    servicesTitle: "Services",
    backServices: "At our service",
    timeLabel: "Appointment time",
    submit: "Send a request",
    smsTitle: "Confirmation",
    smsHint: "A 4-digit code was received at +998 90 *** ** 67.",
    confirm: "Confirm",
    resend: "Send the code again (45s)",
    doneTitle: "Application accepted",
    timeRow: (t: string) => `Time:${t}`,
    navHome: "Home",
    navServices: "Services",
    navApplications: "Applications",
    navProfile: "Profile",
    qHome: "Open the service catalog.",
    qServices: "Which service is suitable?",
    qForm: "What time should I choose?",
    qSms: "Enter the code from SMS",
    qDone: "Appointment confirmed",
    sDone: "Application accepted.",
    sSms: "We are waiting for the code from SMS.",
    sFormTimeChosen: "The time has been chosen.",
    sFormChooseTime: "The service has been selected. Choose a time.",
    sServicesEmpty: "The service has not yet been selected.",
    sServicesChosen: "The service has been selected.",
    sHome: "Open the services section.",
    panelTitle: "Submit your application",
    hint: "Open the desired service → fill out the form → confirm the code from SMS.",
    feedbackCorrect: "Right",
    feedbackSoft: "Let's remember",
    next: "Next",
    openServices: "Open services",
    overlayGood: "Well done!",
    overlaySoft: "Not the service",
    continue: "Continue",
  },
  uz: {
    timeNow: "09:42",
    brandTitle: "my.gov.uz",
    brandSub: "Elektron hukumat",
    avatarLetter: "I",
    taskLabel: "Topshiriq:",
    searchPlaceholder: "Xizmatni topish...",
    categoriesTitle: "Kategoriyalar",
    popularTitle: "Mashhur",
    popularDoctor: "Shifokorga yozilish",
    popularCert: "Maʼlumotnomalar",
    popularAll: "Barcha xizmatlar",
    backHome: "Bosh sahifaga",
    servicesTitle: "Xizmatlar",
    backServices: "Xizmatlarga",
    timeLabel: "Qabul vaqti",
    submit: "Ariza topshirish",
    smsTitle: "Tasdiqlash",
    smsHint: "+998 90 *** ** 67 raqamiga 4 xonali kod yuborildi.",
    confirm: "Tasdiqlash",
    resend: "Kodni qayta yuborish (45s)",
    doneTitle: "Ariza qabul qilindi",
    timeRow: (t: string) => `Vaqt: ${t}`,
    navHome: "Bosh sahifa",
    navServices: "Xizmatlar",
    navApplications: "Arizalar",
    navProfile: "Profil",
    qHome: "Xizmatlar katalogini och.",
    qServices: "Qaysi xizmat toʻgʻri keladi?",
    qForm: "Qaysi vaqtni tanlaysan?",
    qSms: "SMS dan kodni kirit",
    qDone: "Yozilish tasdiqlandi",
    sDone: "Ariza qabul qilindi.",
    sSms: "SMS dan kodni kutmoqdamiz.",
    sFormTimeChosen: "Vaqt tanlandi.",
    sFormChooseTime: "Xizmat tanlandi. Vaqtni tanla.",
    sServicesEmpty: "Xizmat hali tanlanmagan.",
    sServicesChosen: "Xizmat tanlandi.",
    sHome: "Xizmatlar boʻlimini och.",
    panelTitle: "Ariza topshir",
    hint: "Kerakli xizmatni och → formani toʻldir → SMS kodini tasdiqla.",
    feedbackCorrect: "Toʻgʻri",
    feedbackSoft: "Esda tutaylik",
    next: "Davom etish",
    openServices: "Xizmatlarni ochish",
    overlayGood: "Barakalla!",
    overlaySoft: "Notoʻgʻri xizmat",
    continue: "Davom etish",
  },
} as const;

export function MyGovTrainer({ trainer, onDone, studentMode = false }: Props) {
  const locale = useLocale();
  const t = dict[locale];
  const categories = categoriesByLocale[locale];
  const [step, setStep] = useState<Step>("home");
  const [pickedService, setPickedService] = useState<number | null>(null);
  const [pickedTime, setPickedTime] = useState<string | null>(null);
  const [smsCode, setSmsCode] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [orderNumber] = useState(() => Math.floor(100000 + Math.random() * 900000));

  const service = pickedService !== null ? trainer.services[pickedService] : null;
  const correct = Boolean(service?.correct);

  function openServices() {
    setStep("services");
  }

  function chooseService(i: number) {
    if (pickedService !== null) return;
    setPickedService(i);
    const chosen = trainer.services[i];
    if (chosen.correct) {
      setTimeout(() => setStep("form"), 400);
    } else {
      setFeedback(trainer.feedbackWrong);
    }
  }

  function submitForm() {
    setStep("sms");
  }

  function confirmSms() {
    if (smsCode.length !== 4) return;
    setStep("done");
    setFeedback(trainer.feedbackCorrect);
  }

  const serviceAnswers: StudentTaskPanelAnswer[] = trainer.services.map((item, index) => ({
    id: `service-${index}`,
    text: item.title,
    detail: item.subtitle,
    state:
      pickedService !== null
        ? item.correct
          ? "correct"
          : pickedService === index
            ? "wrong"
            : "muted"
        : "idle",
    disabled: pickedService !== null,
    onClick: () => chooseService(index),
  }));

  const timeAnswers: StudentTaskPanelAnswer[] = trainer.confirmStep.timeOptions.map((time) => ({
    id: `time-${time}`,
    text: time,
    state: pickedTime === time ? "selected" : "idle",
    disabled: step === "done" || step === "sms",
    onClick: () => setPickedTime(time),
  }));

  const panelQuestion =
    step === "home"
      ? t.qHome
      : step === "services"
        ? t.qServices
        : step === "form"
          ? t.qForm
          : step === "sms"
            ? t.qSms
            : t.qDone;
  const panelStatus =
    step === "done"
      ? t.sDone
      : step === "sms"
        ? t.sSms
        : step === "form"
          ? pickedTime
            ? t.sFormTimeChosen
            : t.sFormChooseTime
          : step === "services"
            ? pickedService === null
              ? t.sServicesEmpty
              : t.sServicesChosen
            : t.sHome;

  const portalFrame = (
    <div className="mygov-phone">
      <div className="mygov-statusbar">
        <span>{t.timeNow}</span>
        <span className="mygov-statusbar-icons">
          <CabinetIcon name="signal" />
          <span>4G</span>
          <CabinetIcon name="battery" />
        </span>
      </div>

      <header className="mygov-mobile-header">
        <div className="mygov-mobile-brand">
          <span className="mygov-emblem" aria-hidden="true">UZ</span>
          <div>
            <strong>{t.brandTitle}</strong>
            <small>{t.brandSub}</small>
          </div>
        </div>
        <span className="mygov-mobile-avatar" aria-hidden="true">{t.avatarLetter}</span>
      </header>

      {!studentMode && step === "home" ? (
        <div className="mygov-task">{t.taskLabel} {trainer.task}</div>
      ) : null}

      {/* Home */}
      {step === "home" ? (
        <div className="mygov-mobile-home">
          <div className="mygov-mobile-search">
            <CabinetIcon name="search" />
            <span>{t.searchPlaceholder}</span>
          </div>

          <p className="mygov-section-title">{t.categoriesTitle}</p>
          <div className="mygov-mobile-categories">
            {categories.map((c) => (
              <button key={c.label} type="button" className="mygov-mobile-category" onClick={openServices}>
                <span className="mygov-mobile-category-icon" aria-hidden="true">
                  <UiIcon name={c.icon} />
                </span>
                <strong>{c.label}</strong>
                <small>{c.count}</small>
              </button>
            ))}
          </div>

          <p className="mygov-section-title">{t.popularTitle}</p>
          <div className="mygov-mobile-popular">
            <button type="button" className="mygov-mobile-popular-item" onClick={openServices}>
              <UiIcon name="health" />
              <span>{t.popularDoctor}</span>
              <small>›</small>
            </button>
            <button type="button" className="mygov-mobile-popular-item" onClick={openServices}>
              <UiIcon name="certificate" />
              <span>{t.popularCert}</span>
              <small>›</small>
            </button>
            <button type="button" className="mygov-mobile-popular-item" onClick={openServices}>
              <UiIcon name="services" />
              <span>{t.popularAll}</span>
              <small>›</small>
            </button>
          </div>
        </div>
      ) : null}

      {/* Services list */}
      {step === "services" ? (
        <div className="mygov-mobile-services-page">
          <button type="button" className="mygov-mobile-back" onClick={() => setStep("home")}>
            <CabinetIcon name="chevron-left" />
            <span>{t.backHome}</span>
          </button>
          <p className="mygov-section-title">{t.servicesTitle}</p>
          {trainer.services.map((s, i) => (
            <button
              key={i}
              type="button"
              className={`mygov-mobile-service${pickedService === i ? " active" : ""}${pickedService !== null && pickedService !== i ? " dim" : ""}`}
              onClick={() => chooseService(i)}
              disabled={pickedService !== null && pickedService !== i}
            >
              <span className="mygov-mobile-service-icon" aria-hidden="true">
                <UiIcon name={serviceIconName(s.title)} />
              </span>
              <div className="mygov-mobile-service-info">
                <strong>{s.title}</strong>
                <small>{s.subtitle}</small>
              </div>
              <span className="mygov-mobile-service-arrow" aria-hidden="true">›</span>
            </button>
          ))}
        </div>
      ) : null}

      {/* Form */}
      {step === "form" && service ? (
        <div className="mygov-mobile-form-page">
          <button type="button" className="mygov-mobile-back" onClick={() => setStep("services")}>
            <CabinetIcon name="chevron-left" />
            <span>{t.backServices}</span>
          </button>
          <p className="mygov-mobile-form-title">{trainer.confirmStep.title}</p>

          <div className="mygov-mobile-form">
            {trainer.confirmStep.fields.map((f, i) => (
              <div key={i} className="mygov-mobile-field">
                <label>{f.label}</label>
                <div className="mygov-mobile-field-value">{f.value}</div>
              </div>
            ))}

            <div className="mygov-mobile-field">
              <label>{t.timeLabel}</label>
              <div className="mygov-mobile-time-grid">
                {trainer.confirmStep.timeOptions.map((t2) => (
                  <button
                    key={t2}
                    type="button"
                    className={`mygov-mobile-time${pickedTime === t2 ? " active" : ""}`}
                    onClick={() => setPickedTime(t2)}
                    disabled={studentMode}
                  >
                    {t2}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {!studentMode ? (
            <button type="button" className="mygov-mobile-submit" onClick={submitForm} disabled={!pickedTime}>
              {t.submit}
            </button>
          ) : null}
        </div>
      ) : null}

      {/* SMS */}
      {step === "sms" ? (
        <div className="mygov-mobile-sms">
          <div className="mygov-mobile-sms-icon" aria-hidden="true"><CabinetIcon name="phone" /></div>
          <p className="mygov-mobile-form-title">{t.smsTitle}</p>
          <p className="mygov-mobile-sms-hint">
            {t.smsHint}
          </p>
          <div className="mygov-mobile-sms-inputs">
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={smsCode[i] ?? ""}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "").slice(0, 1);
                  setSmsCode((cur) => {
                    const arr = cur.split("");
                    arr[i] = v;
                    return arr.join("").slice(0, 4);
                  });
                  const nextInput = document.querySelectorAll<HTMLInputElement>(".mygov-mobile-sms-inputs input")[i + 1];
                  if (v && nextInput) nextInput.focus();
                }}
              />
            ))}
          </div>
          <button type="button" className="mygov-mobile-submit" onClick={confirmSms} disabled={smsCode.length !== 4}>
            {t.confirm}
          </button>
          <button type="button" className="mygov-mobile-resend">
            {t.resend}
          </button>
        </div>
      ) : null}

      {/* Done */}
      {step === "done" ? (
        <div className="mygov-mobile-done">
          <div className="mygov-mobile-done-icon">
            <CabinetIcon name="check" />
          </div>
          <strong>{t.doneTitle}</strong>
          <p>{service?.title}</p>
          <p className="mygov-mobile-done-num">GOV-{orderNumber}</p>
          {pickedTime ? <p className="mygov-mobile-done-num">{t.timeRow(pickedTime)}</p> : null}
        </div>
      ) : null}

      <nav className="mygov-mobile-nav">
        <span className="mygov-mobile-nav-item active">
          <CabinetIcon name="home" />
          <small>{t.navHome}</small>
        </span>
        <span className="mygov-mobile-nav-item">
          <CabinetIcon name="folder" />
          <small>{t.navServices}</small>
        </span>
        <span className="mygov-mobile-nav-item">
          <CabinetIcon name="clipboard" />
          <small>{t.navApplications}</small>
        </span>
        <span className="mygov-mobile-nav-item">
          <CabinetIcon name="user" />
          <small>{t.navProfile}</small>
        </span>
      </nav>
    </div>
  );

  return (
    <div className={`mygov-trainer${studentMode ? " student-trainer-workspace" : ""}`}>
      {studentMode ? <div className="student-trainer-surface">{portalFrame}</div> : portalFrame}

      {studentMode ? (
        <StudentTaskPanel
          title={t.panelTitle}
          instruction={trainer.task}
          question={panelQuestion}
          status={panelStatus}
          answers={
            step === "form" || step === "sms" || step === "done"
              ? timeAnswers
              : step === "services"
                ? serviceAnswers
                : []
          }
          hint={t.hint}
          feedback={
            feedback
              ? {
                  tone: correct ? "good" : "soft",
                  title: correct ? t.feedbackCorrect : t.feedbackSoft,
                  text: feedback,
                }
              : null
          }
          primaryAction={
            feedback
              ? { label: t.next, onClick: () => onDone({ correct }) }
              : step === "home"
                ? { label: t.openServices, onClick: openServices }
                : step === "form"
                  ? { label: t.submit, onClick: submitForm, disabled: !pickedTime }
                  : step === "sms"
                    ? { label: t.confirm, onClick: confirmSms, disabled: smsCode.length !== 4 }
                    : undefined
          }
        />
      ) : null}

      {feedback && !studentMode ? (
        <TrainerFeedbackOverlay
          tone={correct ? "good" : "soft"}
          title={correct ? t.overlayGood : t.overlaySoft}
          text={feedback}
          actionLabel={t.continue}
          onAction={() => onDone({ correct })}
        />
      ) : null}
    </div>
  );
}
