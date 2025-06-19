import pino, { type LoggerOptions } from "pino";

const isProd = process.env.NODE_ENV === "production";

export const loggerOptions: LoggerOptions = {
  transport: isProd
    ? undefined
    : {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "yyyy-mm-dd HH:MM:ss.l",
          ignore: "pid,hostname",
        },
      },
};

export const logger = pino(loggerOptions);
