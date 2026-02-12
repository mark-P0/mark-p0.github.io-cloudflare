import { useEffect, useState } from "react";
import { SECTION_RECORDS, type SectionRecord } from "../../section-records.ts";

export function useSectionObserver() {
  const [visibleSectionId, setVisibleSectionId] = useState<
    SectionRecord["id"] | null
  >(null);

  useEffect(() => {
    const sectionElementRecords = SECTION_RECORDS.map(({ id }) => ({
      id,
      element: document.getElementById(id),
      isVisible: false,
    }));

    const observerCallback: IntersectionObserverCallback = (entries) => {
      /** On every callback run, assume none of the sections are visible */
      for (const section of sectionElementRecords) {
        section.isVisible = false;
      }

      for (const entry of entries) {
        const { target, isIntersecting } = entry;
        if (!isIntersecting) continue;

        for (const section of sectionElementRecords) {
          if (target !== section.element) continue;

          section.isVisible = true;
          break;
        }
      }

      for (const section of sectionElementRecords) {
        if (!section.isVisible) continue;

        setVisibleSectionId(section.id);
        break;
      }
    };

    /** https://stackoverflow.com/a/69020644 */
    const observerOptions: IntersectionObserverInit = {
      /** Makes the observer only look at the very center of the root for intersections */
      rootMargin: "-50% 0% -50% 0%",
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    for (const section of sectionElementRecords) {
      if (section.element === null) {
        console.warn(`An element to observe does not exist!`);
        continue;
      }

      observer.observe(section.element);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    visibleSectionId,
  };
}
