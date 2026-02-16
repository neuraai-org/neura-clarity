export default function OnboardingPage() {
  return (
    <main style={{ padding: 24, fontFamily: "Arial, sans-serif", display: "grid", gap: 16 }}>
      <h1>Welcome to Weekly Clarity</h1>
      <p>Complete setup in under 3 minutes.</p>
      <ol>
        <li>Connect your calendar</li>
        <li>Install Slack app</li>
        <li>Choose weekly defaults</li>
      </ol>

      <section style={{ display: "grid", gap: 8 }}>
        <h2 style={{ margin: 0 }}>Connect calendar</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <a
            href="http://localhost:3000/v1/integrations/calendar/google/connect"
            style={{
              display: "inline-block",
              padding: "10px 14px",
              border: "1px solid #ccc",
              borderRadius: 8,
              textDecoration: "none",
              color: "#111",
            }}
          >
            Connect Google Calendar
          </a>
          <a
            href="http://localhost:3000/v1/integrations/calendar/microsoft/connect"
            style={{
              display: "inline-block",
              padding: "10px 14px",
              border: "1px solid #ccc",
              borderRadius: 8,
              textDecoration: "none",
              color: "#111",
            }}
          >
            Connect Microsoft Calendar
          </a>
        </div>
      </section>

      <section style={{ display: "grid", gap: 8 }}>
        <h2 style={{ margin: 0 }}>Connect Slack</h2>
        <a
          href="http://localhost:3000/v1/integrations/slack/connect"
          style={{
            display: "inline-block",
            width: "fit-content",
            padding: "10px 14px",
            border: "1px solid #ccc",
            borderRadius: 8,
            textDecoration: "none",
            color: "#111",
          }}
        >
          Install Slack app
        </a>
      </section>

      <p style={{ fontSize: 13, color: "#666", marginTop: 8 }}>
        These onboarding links require the backend API running on http://localhost:3000.
      </p>
    </main>
  );
}
