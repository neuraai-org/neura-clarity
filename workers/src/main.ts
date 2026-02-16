import { createQueueConnection } from "./shared/queue/queue-factory";

async function bootstrap(): Promise<void> {
  const connection = createQueueConnection();
  await connection.ping();
  console.log("Workers bootstrapped");
  await connection.quit();
}

bootstrap().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
