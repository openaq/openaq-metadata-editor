'use strict';

export default {
  environment: 'production',
  mapbox: {
    token: null,
    baseStyle: null
  },
  apiUrl: null,
  auth: {
    // Domain and client can be found in the Auth0 Application page.
    domain: null,
    clientID: null,
    // App url + /callback. Ex: http://localhost:3000/callback
    callbackUrl: null,
    // Audience is the identifier chosen for the Api. Ex: http://openaq.org
    audience: null
  }
};
