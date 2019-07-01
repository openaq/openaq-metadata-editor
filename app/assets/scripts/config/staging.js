'use strict';

export default {
  environment: 'staging',
  mapbox: {
    token: null,
    baseStyle: null
  },
  apiUrl: 'http://api.openaq-staging.org',
  auth: {
    // Domain and client can be found in the Auth0 Application page.
    domain: null,
    clientID: null,
    callbackUrl: 'http://metadata.openaq-staging.org/callback',
    audience: 'http://openaq.org'
  }
};
