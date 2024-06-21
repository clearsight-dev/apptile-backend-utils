import winston from 'winston';
import { config } from '../config';
import { getTracingId, getValueFromNamespace } from './requestTracer';
import { NAMESPACE_LOG_TRACE_EVENT_GUID_KEY } from '../constants';

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

// Custom format to output JSON logs
const format = winston.format.combine(
  winston.format.errors({ stack: true }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf((info) => {
    const tracingId = getTracingId(); // Same as requestTracingNamespace.get(tracingIdContextKeyName);
    const eventGuid = getValueFromNamespace(NAMESPACE_LOG_TRACE_EVENT_GUID_KEY);
    return JSON.stringify({
      timestamp: info.timestamp,
      level: info.level,
      tracingId: tracingId || '-',
      eventGuid: eventGuid || '',
      message: info.message,
      stack: info.stack || ''
    });
  })
);

// Define which transports the logger must use to print out messages.
const transports = [
  // Allow the use of the console to print the messages
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
