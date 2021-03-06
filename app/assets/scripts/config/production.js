'use strict';

export default {
  environment: 'production',
  mapbox: {
    token: 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q',
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
