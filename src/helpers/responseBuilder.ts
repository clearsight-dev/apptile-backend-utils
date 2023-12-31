import express from 'express';

export const jsonResponse = <T>(res: express.Response, code: number, data: T) => {
  if (!!data) {
    res.type('application/json');
    return res.status(code).json(data);
  } else {
    return res.sendStatus(code);
  }
};

export const jsonErrorResponse = (res: express.Response, code: number, error: Error | string) => {
  const message = typeof error == 'string' ? error : error.message;
  return jsonResponse(res, code, {message});
};

export default class ResponseBuilder {
  static Ok<T>(res: express.Response, data?: T) {
    jsonResponse(res, 200, data);
  }

  static Created<T>(res: express.Response, data?: T) {
    jsonResponse(res, 201, data);
  }

  static NotModified<T>(res: express.Response, message?: string) {
    jsonResponse(res, 304, message ? message : 'Not Modified');
  }

  static CustomSuccessResponse<T>(res: express.Response, code: number, message?: string) {
    jsonResponse(res, code, message ? message : 'Success');
  }

  static Unauthorized(res: express.Response, message?: string) {
    return jsonErrorResponse(res, 401, message ? message : 'Unauthorized');
  }

  static Forbidden(res: express.Response, message?: string) {
    return jsonErrorResponse(res, 403, message ? message : 'Forbidden');
  }

  static NotFound(res: express.Response, message?: string) {
    return jsonErrorResponse(res, 404, message ? message : 'Not found');
  }

  static BadRequest(res: express.Response, message?: string) {
    return jsonErrorResponse(res, 400, message ? message : 'Bad Request');
  }

  static CustomError(res: express.Response, code: number, message?: string) {
    return jsonErrorResponse(res, code, message ? message : 'Some error occurred');
  }

  static InternalServerError(res: express.Response, error: Error | string) {
    return jsonErrorResponse(res, 500, typeof error == 'string' ? error : error.message);
  }
}
