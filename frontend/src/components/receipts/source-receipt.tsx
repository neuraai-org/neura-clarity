type SourceReceiptProps = {
  sourceType: "meeting_description" | "note" | "calendar_metadata";
  sourceId: string;
  snippet: string;
};

export function SourceReceipt({ sourceType, sourceId, snippet }: SourceReceiptProps) {
  return (
    <aside>
      <strong>Source</strong>
      <div>{sourceType}</div>
      <div>{sourceId}</div>
      <blockquote>{snippet}</blockquote>
    </aside>
  );
}
