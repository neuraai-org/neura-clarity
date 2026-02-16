export type SlackNoteEvent = {
  channelType: "dm" | "thread";
  text: string;
  ts: string;
};

export function ingestSlackNote(event: SlackNoteEvent): {
  source: "slack_dm" | "slack_thread";
  text: string;
  timestamp: string;
} {
  return {
    source: event.channelType === "dm" ? "slack_dm" : "slack_thread",
    text: event.text,
    timestamp: event.ts,
  };
}
