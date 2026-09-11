import { HomepageContent } from "@/components/homepage-content";
import { getHomepageDraft } from "@/data/homepage-draft";
import { getFeaturedLesson, getProgramModules } from "@/data/program";
import { getLocale } from "@/lib/i18n";

export default async function HomePage() {
  const locale = await getLocale();
  const draft = getHomepageDraft(locale);
  const programModules = getProgramModules(locale);
  const featuredLesson = getFeaturedLesson(locale);
  const homeModules = programModules.slice(0, 5);
  const featuredLessonHref = `/lesson/${featuredLesson.slug}`;

  return (
    <HomepageContent
      draft={draft}
      featuredLessonHref={featuredLessonHref}
      homeModules={homeModules}
      locale={locale}
    />
  );
}
