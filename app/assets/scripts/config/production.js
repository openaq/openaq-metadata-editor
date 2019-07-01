'use strict';

export default {
  environment: 'production',
  mapbox: {
    token: null,
    baseStyle: null
  },
  apiUrl: 'http://api.openaq.org',
  auth: {
    // Domain and client can be found in the Auth0 Application page.
    domain: null,
    clientID: null,
    callbackUrl: 'http://metadata.openaq.org/callback',
    audience: 'http://openaq.org'
  }
};
