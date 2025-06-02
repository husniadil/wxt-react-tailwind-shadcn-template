export const Trigger = {
  POPUP: "popup",
  CONTENT: "content",
} as const;

export type Trigger = (typeof Trigger)[keyof typeof Trigger];
