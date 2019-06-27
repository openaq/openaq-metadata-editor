import React from 'react';
import mapboxgl from 'mapbox-gl';

import { mapbox } from '../config';

mapboxgl.accessToken = mapbox.token;

class Map extends React.Component {
  componentDidMount () {
    const { zoom, coordinates } = this.props;

    this.map = new mapboxgl.Map({
      center: coordinates,
      container: this.mapContainer,
      style: mapbox.baseStyle,
      zoom: zoom || 8
    });

    this.marker = new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(this.map);
  }

  componentWillUnmount () {
    this.map.remove();
  }

  render () {
    const { width, height } = this.props;

    return (
      <div className='map'>
        <div
          className='map__container'
          ref={(el) => (this.mapContainer = el)}
          style={{ width, height }}
        >
        </div>
      </div>
    );
  }
}

export default Map;
