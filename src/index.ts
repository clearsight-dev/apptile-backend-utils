import Api from './api/Api';
import {ResponseBuilder} from './helpers';
import defaultErrorHandler from './middleware/errorHandler';
import httpRequestTracer from './middleware/httpRequestTracer';
import requestLogger from './middleware/requestLogger';
import {CustomHttpRequestError} from './types';
import logger from './utils/logger';
import {
  requestTracingNamespace,
  getTracingId,
  setTracingId,
  generateTraceId,
  setValueInNamespace,
  getValueFromNamespace
} from './utils/requestTracer';

export {
  Api,
  ResponseBuilder,
  defaultErrorHandler,
  httpRequestTracer,
  requestLogger,
  CustomHttpRequestError,
  logger,
  requestTracingNamespace,
  getTracingId,
  setTracingId,
  generateTraceId,
  setValueInNamespace,
  getValueFromNamespace
};
