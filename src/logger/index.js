import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { v4 as uuid } from "uuid";
import _ from "lodash";

class Logger {
  constructor() {
    const formatPrintf = format.printf(
      ({
        level,
        message,
        context,
        timestamp,
        metadata = "unknown",
        label,
        requestId,
      }) =>
        `${timestamp} [${label}] ${level} :: ${message} :: ${context} :: ${requestId} ::  ${JSON.stringify(
          metadata
        )}`
    );

    this.logger = createLogger({
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.label({ label: "ShopDev" }), // Add a label to identify the logger
        formatPrintf
      ),
      transports: [
        new transports.Console(),
        new DailyRotateFile({
          dirname: "src/logs",
          filename: "application-%DATE%.log",
          datePattern: "YYYY-MM-DD-HH",
          zippedArchive: true,
          maxFiles: "14d",
          format: format.combine(
            format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            formatPrintf
          ),
          level: "info",
        }),
        new DailyRotateFile({
          dirname: "src/logs",
          filename: "application-%DATE%.error.log",
          datePattern: "YYYY-MM-DD-HH",
          zippedArchive: true,
          maxFiles: "14d",
          format: format.combine(
            format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            formatPrintf
          ),
          level: "error",
        }),
      ],
    });
  }

  commomParams(params) {
    const req = params?.req;
    const requestId = req?.requestId || uuid();
    const context = req?.originalUrl || "unknow";
    return _.chain(params)
      .set("requestId", requestId)
      .set("context", context)
      .value();
  }

  log(message, params) {
    const paramsLog = this.commomParams(params);
    const logObject = Object.assign({ message }, paramsLog);
    this.logger.info(logObject);
  }

  error(message, params) {
    const paramsLog = this.commomParams(params);
    const logObject = Object.assign({ message }, paramsLog);
    this.logger.error(logObject);
  }
}

export default new Logger();
