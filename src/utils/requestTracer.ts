import cls from 'cls-hooked';
import {NAMESPACE_LOG_TRACE, NAMESPACE_LOG_TRACE_KEY} from '../constants';
import {nanoid} from 'nanoid';

export const requestTracingNamespace = cls.createNamespace(NAMESPACE_LOG_TRACE);

export const generateTraceId = () => {
  return nanoid(10);
};

export const getTracingId = () => {
  return requestTracingNamespace?.get(NAMESPACE_LOG_TRACE_KEY);
};

export const setTracingId = (traceId: string) => {
  return requestTracingNamespace?.set(NAMESPACE_LOG_TRACE_KEY, traceId);
};
