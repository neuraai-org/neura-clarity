type ErrorContext = {
  scope: string;
  metadata?: Record<string, unknown>;
};

export function captureError(error: unknown, context: ErrorContext): void {
  const message = error instanceof Error ? error.message : "unknown_error";
  // Placeholder sink for APM/Sentry integration.
  console.error(
    JSON.stringify({
      level: "error",
      message,
      context,
      timestamp: new Date().toISOString(),
    }),
  );
}
