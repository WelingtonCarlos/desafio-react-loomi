export const AI_SUGGESTION_TABS = [
  { key: "NBO" as const, label: "NBO" },
  { key: "NBA" as const, label: "NBA" },
  { key: "NBX" as const, label: "NBX" },
] as const;

export type AISuggestionTabKey = (typeof AI_SUGGESTION_TABS)[number]["key"];
