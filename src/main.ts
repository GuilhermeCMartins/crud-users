import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { logger } from "./logger/logger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: false,
  });

  app.useLogger({
    log: (msg) => logger.info(msg),
    error: (msg) => logger.error(msg),
    warn: (msg) => logger.warn(msg),
    debug: (msg) => logger.debug(msg),
    verbose: (msg) => logger.trace(msg),
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
