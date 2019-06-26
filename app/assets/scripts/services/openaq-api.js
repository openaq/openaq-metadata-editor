import fetch from 'unfetch';
import qs from 'query-string';

import { apiUrl } from '../config';
import auth from './auth';

/**
 * Takes the state filters from the store
 * and turns them into a query param string
 * for filtering
 * @param {Object} filters
 * @returns {String}
 */
function _convertFiltersToParamString (filters) {
  let params = '';
  let { countries, installationDate } = filters;

  /** countries */
  countries.forEach(country => {
    params = `${params}&country=${country.value}`;
  });

  /** installation dates */
  params = `${params}&activationDate=["${new Date(installationDate.start)}","${new Date(installationDate.end)}"]`;

  /** elevation */
  params = `${params}`;

  return params;
}

function request (method, url, params = {}, filters) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth.getAccessToken()}`
  };

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
    if (filters) {
      query = `${query}&${_convertFiltersToParamString(filters)}`;
    }
  }

  const fullUrl = `${url}?${query}`;
  return fetch(fullUrl, options)
    .then(res => res.json());
}

function getMetadataList (params, filters) {
  const url = `${apiUrl}/v1/locations`;

  return request('GET', url, Object.assign({}, { metadata: 'true' }, params), filters);
}

function getMetadata (id) {
  const url = `${apiUrl}/v1/locations/${id}`;

  return request('GET', url, { metadata: true });
}

function putMetadata (id, params) {
  const url = `${apiUrl}/v1/locations/${id}/metadata/`;

  return request('PUT', url, params);
}

export default {
  getMetadataList,
  getMetadata,
  putMetadata
};
