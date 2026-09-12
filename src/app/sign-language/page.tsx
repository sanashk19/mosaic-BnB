import type { Metadata } from "next";
import { SignLanguageLearningStudio } from "@/components/sign-language-learning-studio";
import "@/components/sign-language.css";

export const metadata: Metadata = {
  title: "Indian Sign Language | Mosaic",
  description:
    "Mosaic's Indian Sign Language learning studio helps learners practice, recognize and explore Indian Sign Language through accessible interactive tools.",
};

export default function SignLanguagePage() {
  return (
    <main className="sign-language-page min-h-screen bg-white">
      <SignLanguageLearningStudio />
    </main>
  );
}
