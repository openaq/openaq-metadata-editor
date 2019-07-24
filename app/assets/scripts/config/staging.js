'use strict';

export default {
  environment: 'staging',
  apiUrl: 'https://api.openaq-staging.org',
  mapbox: {
    token: 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q',
    baseStyle: 'mapbox://styles/devseed/ciqs29d060000clnr9222bg5x'
  },
  auth: {
    domain: 'openaq-staging.auth0.com',
    clientID: '_MoXmZ3_AwxoKGdS_VMcf23CpVr0157M',
    callbackUrl: 'https://metadata.openaq-staging.org/callback'
  }
};
