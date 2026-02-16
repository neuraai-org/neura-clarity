export type SlackSuggestionAction = "confirm" | "snooze" | "stop";

export function parseSlackSuggestionAction(actionValue: string): SlackSuggestionAction {
  if (actionValue === "confirm") {
    return "confirm";
  }
  if (actionValue === "snooze_30d") {
    return "snooze";
  }
  return "stop";
}
