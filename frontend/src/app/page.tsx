export default function HomePage() {
  return (
    <main style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>
      <h1>Weekly Clarity MVP</h1>
      <p>Frontend is running.</p>
      <ul>
        <li>
          <a href="/onboarding">Onboarding</a>
        </li>
        <li>
          <a href="/inbox">Inbox</a>
        </li>
        <li>
          <a href="/history">History</a>
        </li>
      </ul>
    </main>
  );
}
