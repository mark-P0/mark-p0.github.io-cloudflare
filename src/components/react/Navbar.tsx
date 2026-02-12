/** @jsxImportSource react */

import { SECTION_RECORDS, type SectionRecord } from "../../section-records.ts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./shadcn/tooltip.tsx";
import { cn } from "./shadcn/utils.ts";
import { useSectionObserver } from "./useSectionObserver.tsx";

function SectionLink(props: {
  section: SectionRecord;
  visibleSectionId: SectionRecord["id"];
}) {
  const { section, visibleSectionId } = props;

  const isThisSectionVisible = visibleSectionId === section.id;
  const isLastSectionVisible = visibleSectionId === "talk-to-me";

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={`#${section.id}`}
            className={cn(
              "w-6 h-6 rounded-full",
              [
                "shadow-md shadow-white/50",
                isLastSectionVisible && "shadow-primary/50",
              ],
              [
                "transition",
                "bg-primary/50",
                isThisSectionVisible && "bg-primary",
                isLastSectionVisible && "bg-white/50",
                isThisSectionVisible && isLastSectionVisible && "bg-white",
              ]
            )}
          >
            <span className="sr-only">{section.hint}</span>
          </a>
        </TooltipTrigger>

        <TooltipContent
          side="left"
          sideOffset={8}
          className={cn(
            "hidden md:block", // Tablets and larger
            "font-title font-bold text-sm",
            [
              "text-white bg-primary",
              isLastSectionVisible && "text-primary bg-white",
            ]
          )}
        >
          {section.title}
        </TooltipContent>

        <TooltipContent
          sideOffset={8}
          className={cn(
            "md:hidden", // Mobile
            "font-title font-bold",
            [
              "text-white bg-primary",
              isLastSectionVisible && "text-primary bg-white",
            ]
          )}
        >
          {section.title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function Navbar() {
  const { visibleSectionId } = useSectionObserver();

  if (visibleSectionId === null) {
    return null;
  }

  return (
    <nav
      className={cn(
        [
          "fixed z-10",
          "bottom-0 right-1/2 translate-x-1/2", // Mobile (Bottom-center)
          "md:bottom-auto md:right-0 md:translate-x-0", // Tablets and larger (Top-right)
        ],
        "flex md:grid gap-4 py-4 px-6"
      )}
    >
      {SECTION_RECORDS.map((section) => (
        <SectionLink
          key={section.id}
          section={section}
          visibleSectionId={visibleSectionId}
        />
      ))}
    </nav>
  );
}
