export type QueueHealth = {
  queueName: string;
  delayed: number;
  waiting: number;
  failed: number;
  deadLetter: number;
};

export function summarizeQueueHealth(queue: QueueHealth): {
  queueName: string;
  healthy: boolean;
  summary: string;
} {
  const healthy = queue.failed === 0 && queue.deadLetter === 0;
  return {
    queueName: queue.queueName,
    healthy,
    summary: `waiting=${queue.waiting}, delayed=${queue.delayed}, failed=${queue.failed}, dlq=${queue.deadLetter}`,
  };
}
