import express from 'express';
import {v4 as uuidv4} from 'uuid';
import cls from 'cls-hooked';
import {
  NAMESPACE_LOG_TRACE,
  NAMESPACE_LOG_TRACE_HEADER_NAME,
  NAMESPACE_LOG_TRACE_KEY
} from '../constants';
const requestTracingNamespace = cls.createNamespace(NAMESPACE_LOG_TRACE);

export default async function requestTracerMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  requestTracingNamespace.bindEmitter(req);
  requestTracingNamespace.bindEmitter(res);

  const tracingId = req.header(NAMESPACE_LOG_TRACE_HEADER_NAME) || uuidv4();
  res.set(NAMESPACE_LOG_TRACE_HEADER_NAME, tracingId);

  requestTracingNamespace.run(() => {
    requestTracingNamespace.set(NAMESPACE_LOG_TRACE_KEY, tracingId);
    next();
  });
}

export const getTracingId = () => {
  return requestTracingNamespace?.get(NAMESPACE_LOG_TRACE_KEY);
};
