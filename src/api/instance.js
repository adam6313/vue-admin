/* eslint-disable indent */
/* eslint-disable no-alert */
import axios from 'axios';
import config from '@/api/config';
import ErrorCode from '@/api/ErrorCode';
import i18n from '@/plugins/i18n';
import { Message } from 'iview';
import { ToFormData, ToQuerystr, Has } from '@/utils';

const axiosIns = axios.create(config);

// 回傳攔截
axiosIns.interceptors.response.use(response => {
  if (!Has(response, 'data') || !Has(response.data, 'status')) {
    return null;
  }
  const { code } = response.data.status;
  if (code === '0') return response.data.data || true;
  Message.destroy();
  Message.error(i18n.tc(ErrorCode(code)));
  return null;
}, error => {
  Message.destroy();
  Message.error(i18n.tc(ErrorCode(error.response.status)));
  return null;
});

/**
 * Get method
 * @param { String } uri
 * @param { Object } headers
 */
const Get = (uri, Params, headers) => (
  new Promise(resolve => {
    axiosIns.get(uri + ToQuerystr(Params), { headers })
            .then(response => resolve(response));
  })
);

/**
 * Post method
 * @param { String } uri
 * @param { Object } Params
 * @param { Object } headers
 */
const Post = (uri, Params = {}, headers) => (
  new Promise(resolve => {
    axiosIns.post(uri, ToFormData(Params), { headers })
            .then(response => resolve(response));
  })
);

/**
 * Put method
 * @param { String } uri
 * @param { Object } Params
 * @param { Object } headers
 */
const Put = (uri, Params = {}, headers) => (
  new Promise(resolve => {
    axiosIns.put(uri, ToFormData(Params), { headers })
            .then(response => resolve(response));
  })
);

/**
 * Put method
 * @param { String } uri
 * @param { Object } Params
 * @param { Object } headers
 */
const _Put = (uri, Params = {}, headers) => (
  new Promise(resolve => {
    axiosIns.put(uri, Params, { headers })
            .then(response => resolve(response));
  })
);

/**
 * Delete method
 * @param { String } uri
 * @param { Object } Params
 * @param { Object } headers
 */
const Delete = (uri, Params = {}, headers) => (
  new Promise(resolve => {
    axiosIns.delete(uri, { data: ToFormData(Params) }, { headers })
            .then(response => resolve(response));
  })
);

export { Get, Post, Put, _Put, Delete };
