import * as express from 'express';
import logger from '../utils/logger';
import {ResponseBuilder} from '../helpers';
import {CustomHttpRequestError} from '../types';

export const defaultErrorHandler = async (
  ex: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  logger.error(`error occurred for route: '${req.path}', method: '${req.method}' `, ex);
  try {
    logger.error(`req payload: ${JSON.stringify(req.body)}`);
  } catch (err) {
    logger.warn(`req payload: 'NOT AVAILABLE' as '${err.message}'`);
  }
  if (ex instanceof CustomHttpRequestError) {
    ResponseBuilder.CustomError(res, ex.code, ex.message);
  } else {
    ResponseBuilder.InternalServerError(res, 'internal server error');
  }
};
