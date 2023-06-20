import _ from 'lodash';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {NAMESPACE_LOG_TRACE_HEADER_NAME} from '../constants';
import {getTracingId} from '../middleware/httpRequestTracer';

export default class Api {
  static setTraceHeader(config: Partial<AxiosRequestConfig>) {
    if (config != null) _.set(config, `headers.${NAMESPACE_LOG_TRACE_HEADER_NAME}`, getTracingId());
  }

  static get<T>(url: string, config: Partial<AxiosRequestConfig> = {}): Promise<AxiosResponse<T>> {
    Api.setTraceHeader(config);
    return axios.get<T>(url, config);
  }
  static post<T>(
    url: string,
    data?: unknown,
    config: Partial<AxiosRequestConfig> = {}
  ): Promise<AxiosResponse<T>> {
    Api.setTraceHeader(config);
    return axios.post<T>(url, data, config);
  }
  static put<T>(
    url: string,
    data?: unknown,
    config: Partial<AxiosRequestConfig> = {}
  ): Promise<AxiosResponse<T>> {
    Api.setTraceHeader(config);
    return axios.put<T>(url, data, config);
  }

  static patch<T>(
    url: string,
    data?: unknown,
    config: Partial<AxiosRequestConfig> = {}
  ): Promise<AxiosResponse<T>> {
    Api.setTraceHeader(config);
    return axios.patch<T>(url, data, config);
  }

  static delete<T>(
    url: string,
    config: Partial<AxiosRequestConfig> = {}
  ): Promise<AxiosResponse<T>> {
    Api.setTraceHeader(config);
    return axios.delete<T>(url, config);
  }
}
