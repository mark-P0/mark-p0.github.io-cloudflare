export const SECTION_RECORDS = [
  {
    id: "who-am-i",
    title: "Who Am I",
    hint: "Jump to profile",
  },
  {
    id: "what-i-do",
    title: "What I Do",
    hint: "Jump to projects",
  },
  {
    id: "talk-to-me",
    title: "Talk To Me",
    hint: "Jump to contacts",
  },
] as const;

export type SectionRecord = (typeof SECTION_RECORDS)[number];
