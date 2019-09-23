'use strict';

export default {
  environment: 'production',
  mapbox: {
    token: 'pk.eyJ1IjoidW1waHJleTEwMTIiLCJhIjoiQ1MzNldBYyJ9.fM0A16yfZbqCIH0--_X7Eg',
    baseStyle: 'mapbox://styles/devseed/ciqs29d060000clnr9222bg5x'
  },
  apiUrl: 'https://api.openaq.org',
  auth: {
    domain: 'openaq-prod.auth0.com',
    clientID: '2NfSLaCPOGHAfYkkbv4m9A4EFxZ54hHt',
    callbackUrl: 'https://metadata.openaq.org/callback',
    audience: 'https://openaq-prod.auth0.com/api/v2/'
  }
};
