import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

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

    this.draw = new MapboxDraw({
      controls: {
        point: true,
        line_string: false,
        polygon: false,
        trash: false,
        combine_features: false,
        uncombine_features: false
      }
    });

    this.geocoder = new MapboxGeocoder({ accessToken: mapbox.token });

    this.map.addControl(this.draw, 'top-left');
    this.map.addControl(this.geocoder, 'bottom-left');

    const updateArea = (e) => {
      const data = this.draw.getAll();
      const { features } = data;
      const point = features[features.length - 1];

      features.forEach((feature) => {
        if (feature.id === point.id) {
          const [longitude, latitude] = point.geometry.coordinates;
          this.props.onChange({ longitude, latitude });
          return;
        }

        this.draw.delete(feature.id);
      });
    };

    this.map.on('draw.create', updateArea);
    this.map.on('draw.delete', updateArea);
    this.map.on('draw.update', updateArea);
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
