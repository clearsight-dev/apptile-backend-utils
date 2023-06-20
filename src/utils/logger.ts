import winston from 'winston';
import {getTracingId} from '../middleware/requestTracingMiddleware';
import {config} from '../config';
// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running ENV.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

const level = () => {
  return config.logLevel;
};

// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue'
};
// Tell winston that you want to link the colors
// defined above to the severity levels.
winston.addColors(colors);

// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
  winston.format.errors({stack: true}),

  // Add the message timestamp with the preferred format
  winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss:ms'}),
  // Tell Winston that the logs must be colored
  winston.format.colorize({all: true}),

  // Define the format of the message showing the timestamp, the level and the message
  winston.format.printf((info) => {
    const tracingId = getTracingId(); // Same as requestTracingNamespace.get(tracingIdContextKeyName);
    return `${info.timestamp} ${info.level} ${tracingId || '-'}: ${info.message} ${
      info.stack ?? ''
    }`;
  })
);

// Define which transports the logger must use to print out messages.
const transports = [
  // Allow the use the console to print the messages
  new winston.transports.Console()
];

// Create the logger instance that has to be exported
// and used to log messages.
const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
  exceptionHandlers: transports,
  rejectionHandlers: transports
});

export default logger;
