import express from 'express';
import {NAMESPACE_LOG_TRACE_HEADER_NAME} from '../constants';
import {generateTraceId, requestTracingNamespace, setTracingId} from '../utils/requestTracer';

export default async function httpRequestTracer(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  requestTracingNamespace.bindEmitter(req);
  requestTracingNamespace.bindEmitter(res);

  const tracingId = req.header(NAMESPACE_LOG_TRACE_HEADER_NAME) || generateTraceId();
  res.set(NAMESPACE_LOG_TRACE_HEADER_NAME, tracingId);

  requestTracingNamespace.run(() => {
    setTracingId(tracingId);
    next();
  });
}
