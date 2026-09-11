import { DashboardRouter } from "@/components/dashboard-router";
import { getDemoUserPreview, getRoleLabels } from "@/data/demo-user";
import { getDisplayLessons, getProgramModules } from "@/data/program";
import { getLocale } from "@/lib/i18n";

export default async function DashboardPage() {
  const locale = await getLocale();
  const programModules = getProgramModules(locale);
  const displayLessons = getDisplayLessons(locale);
  const roleLabels = getRoleLabels(locale);
  const demoUserPreview = getDemoUserPreview(locale);

  const modules = programModules.map((module) => ({
    slug: module.slug,
    title: module.title,
    total: module.lessonCount,
    lessons: module.lessons.slice(0, module.lessonCount).map((lesson) => ({
      slug: lesson.slug,
      title: lesson.title,
    })),
  }));

  return (
    <main className="dashboard-page">
      <DashboardRouter
        demoUser={demoUserPreview}
        lessons={displayLessons}
        modules={modules}
        roleLabels={roleLabels}
      />
    </main>
  );
}
