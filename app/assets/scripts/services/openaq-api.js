import fetch from 'unfetch';
import qs from 'query-string';

import { apiUrl } from '../config';

function request (method, url, params = {}) {
  const headers = { 'Content-Type': 'application/json' };

  const options = {
    headers,
    method
    // mode: 'cors',
  };

  let query = '';
  if (
    method === 'POST' ||
    method === 'PUT' ||
    method === 'DELETE'
  ) {
    options.body = JSON.stringify(params);
  } else {
    query = qs.stringify(params);
  }

  const fullUrl = url + query;
  return fetch(fullUrl, options)
    .then(res => res.json());
}

function getMetadataList (params) {
  const url = `${apiUrl}/v1/locations/metadata/`;

  return request('GET', url, params);
}

function getMetadata (id) {
  const url = `${apiUrl}/v1/locations/${id}/metadata/`;

  return request('GET', url);
}

function putMetadata (params) {
  const url = `${apiUrl}/v1/locations/metadata/`;

  return request('PUT', url, params);
}

export default {
  getMetadataList,
  getMetadata,
  putMetadata
};
