import type { Metadata } from "next";
import { SignLanguageLearningStudio } from "@/components/sign-language-learning-studio";

export const metadata: Metadata = {
  title: "Sign Language Studio | Mosaic",
  description:
    "Learn Indian Sign Language (ISL) alphabets, numbers, and common conversation signs with real-time AI hand gesture recognition and feedback.",
};

export default function SignLanguagePage() {
  return (
    <main className="sign-language-page min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-[#F9F6F1]">
      <SignLanguageLearningStudio />
    </main>
  );
}
