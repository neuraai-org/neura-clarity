import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AuthModule } from "./modules/auth/auth.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AuthModule, {
    bufferLogs: true,
  });

  app.setGlobalPrefix("v1");

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Weekly Clarity API")
    .setDescription("API documentation for Weekly Clarity MVP")
    .setVersion("1.0.0")
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("swagger", app, swaggerDocument);

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);

  Logger.log(`Backend listening on :${port}`, "Bootstrap");
}

bootstrap().catch((error: unknown) => {
  Logger.error(error, "Bootstrap");
  process.exitCode = 1;
});
