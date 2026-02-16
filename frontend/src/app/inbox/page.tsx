export default function InboxPage() {
  return (
    <main>
      <h1>Inbox</h1>
      <p>Add quick notes from your browser.</p>
      <form>
        <label htmlFor="note">Note</label>
        <textarea id="note" name="note" rows={6} defaultValue="" />
      </form>
    </main>
  );
}
