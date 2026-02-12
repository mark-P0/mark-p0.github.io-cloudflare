/** @jsxImportSource react */

import type { PropsWithChildren } from "react";
import { ScrollArea, ScrollBar, ScrollThumb } from "./shadcn/scroll-area.tsx";
import { cn } from "./shadcn/utils.ts";
import { useSectionObserver } from "./useSectionObserver.tsx";

export function Scrollable(props: PropsWithChildren) {
  const { visibleSectionId } = useSectionObserver();
  const { children } = props;

  const isLastSectionVisible = visibleSectionId === "talk-to-me";

  return (
    <ScrollArea type="always" className="h-screen">
      {children}
      <ScrollBar
        className="p-0"
        thumb={
          <ScrollThumb
            className={cn("rounded-none", [
              "transition-colors",
              "bg-primary",
              isLastSectionVisible && "bg-white",
            ])}
          />
        }
      />
    </ScrollArea>
  );
}
