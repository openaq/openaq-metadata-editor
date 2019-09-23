'use strict';

export default {
  environment: 'production',
  mapbox: {
    token: null,
    baseStyle: null
  },
  apiUrl: 'https://api.openaq.org',
  auth: {
    domain: 'openaq-prod.auth0.com',
    clientID: '2NfSLaCPOGHAfYkkbv4m9A4EFxZ54hHt',
    callbackUrl: 'https://metadata.openaq.org/callback',
    audience: 'https://openaq-prod.auth0.com/api/v2/'
  }
};
